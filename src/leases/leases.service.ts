import {
  Injectable,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { BaseService } from '../core/common/base.service';
import { LeasesRepository } from './leases.repository';
import { Lease, InvoiceItem } from '../../generated/prisma';
import type { PaginationOptions } from '../shared/types/common';
import { InvoiceItemsService } from '../invoice-items/invoice-items.service';
import { CreateLeaseDto, UpdateLeaseDto } from './dto/create-lease.dto';

import { LeaseStatusHistoryService } from '../lease-status-history/lease-status-history.service';

@Injectable()
export class LeasesService extends BaseService<Lease> {
  constructor(
    private leasesRepository: LeasesRepository,
    private historyService: LeaseStatusHistoryService,
    private invoiceItemsService: InvoiceItemsService,
  ) {
    super(leasesRepository);
  }

  async findAll(
    pagination: PaginationOptions = { page: 1, limit: 10 },
    search?: string,
  ): Promise<{ data: Lease[]; total: number; page: number; limit: number }> {
    const page = Number(pagination.page) || 1;
    const limit = Number(pagination.limit) || 10;
    const skip = (page - 1) * limit;

    const where: any = {};

    if (search) {
      where.OR = [
        { leaseNumber: { contains: search, mode: 'insensitive' } },
        { tenant: { name: { contains: search, mode: 'insensitive' } } },
        { unit: { unitNumber: { contains: search, mode: 'insensitive' } } },
      ];
    }

    const [data, total] = await Promise.all([
      this.leasesRepository.findAll({
        skip,
        take: limit,
        where,
        include: {
          tenant: true,
          unit: {
            include: {
              building: true,
            },
          },
        },
      }),
      this.leasesRepository.count(where),
    ]);

    return { data, total, page, limit };
  }

  async create(data: CreateLeaseDto): Promise<Lease> {
    // Ensure numeric fields are converted
    if (typeof data.unitId === 'string')
      data.unitId = parseInt(data.unitId, 10);
    if (typeof data.tenantId === 'string')
      data.tenantId = parseInt(data.tenantId, 10);
    if (typeof data.gracePeriodDays === 'string')
      data.gracePeriodDays = parseInt(data.gracePeriodDays, 10);
    if (typeof data.depositAmount === 'string')
      data.depositAmount = parseFloat(data.depositAmount);

    // Ensure date fields are converted
    if (data.startDate && typeof data.startDate === 'string')
      data.startDate = new Date(data.startDate);
    if (data.endDate && typeof data.endDate === 'string')
      data.endDate = new Date(data.endDate);

    // Check if unit is already leased
    const existingLease = await this.leasesRepository.findByUnit(data.unitId);
    if (existingLease && existingLease.status === 'active') {
      throw new ConflictException('Unit is already leased');
    }

    // Validate dates
    if (data.startDate && data.endDate && data.startDate >= data.endDate) {
      throw new BadRequestException('End date must be after start date');
    }

    // Extract parking space IDs before creating lease
    const { parkingSpaceIds, ...leaseData } = data;

    const lease = await this.leasesRepository.create(leaseData);

    // Assign parking spaces to the lease if provided
    if (parkingSpaceIds && parkingSpaceIds.length > 0) {
      await this.assignParkingSpaces(lease.id, parkingSpaceIds);
    }

    // Record initial status
    await this.historyService.recordStatusChange({
      leaseId: lease.id,
      oldStatus: null,
      newStatus: lease.status,
      changedBy: 1,
      note: 'Initial lease creation',
    });

    return lease;
  }

  async update(
    id: number,
    data: UpdateLeaseDto & { note?: string; parkingSpaceIds?: number[] },
  ): Promise<Lease> {
    const oldLease = await this.findOne(id);
    const { note, parkingSpaceIds, tenantId, unitId, ...otherData } = data;

    // Build the update data in Prisma's expected nested format
    const updateData: any = { ...otherData };

    // Remove direct foreign keys from updateData and add nested relations instead
    delete updateData.tenantId;
    delete updateData.unitId;

    // Convert direct foreign keys to nested relations
    if (tenantId !== undefined) {
      updateData.tenant = {
        connect: {
          id: typeof tenantId === 'string' ? parseInt(tenantId, 10) : tenantId,
        },
      };
    }
    if (unitId !== undefined) {
      updateData.unit = {
        connect: {
          id: typeof unitId === 'string' ? parseInt(unitId, 10) : unitId,
        },
      };
    }

    // Handle numeric and date conversions
    if (typeof updateData.gracePeriodDays === 'string')
      updateData.gracePeriodDays = parseInt(updateData.gracePeriodDays, 10);
    if (typeof updateData.depositAmount === 'string')
      updateData.depositAmount = parseFloat(updateData.depositAmount);

    // Ensure date fields are converted
    if (updateData.startDate && typeof updateData.startDate === 'string')
      updateData.startDate = new Date(updateData.startDate);
    if (updateData.endDate && typeof updateData.endDate === 'string')
      updateData.endDate = new Date(updateData.endDate);

    const updatedLease = await super.update(id, updateData);

    // Handle parking space updates if provided
    if (parkingSpaceIds !== undefined) {
      await this.assignParkingSpaces(id, parkingSpaceIds);
    }

    if (oldLease.status !== updatedLease.status) {
      await this.historyService.recordStatusChange({
        leaseId: id,
        oldStatus: oldLease.status,
        newStatus: updatedLease.status,
        changedBy: 1,
        note: note || 'Status updated',
      });
    }

    return updatedLease;
  }

  async findByTenant(tenantId: number): Promise<Lease[]> {
    return this.leasesRepository.findByTenant(tenantId);
  }

  async findByUnit(unitId: number): Promise<Lease | null> {
    return this.leasesRepository.findByUnit(unitId);
  }

  async findActive(): Promise<Lease[]> {
    return this.leasesRepository.findActive();
  }

  async assignParkingSpaces(
    leaseId: number,
    parkingSpaceIds: number[],
  ): Promise<void> {
    // First, unassign any existing parking spaces from this lease
    await this.leasesRepository.unassignParkingSpaces(leaseId);

    // Then assign the new parking spaces
    await this.leasesRepository.assignParkingSpaces(leaseId, parkingSpaceIds);
  }

  async generateInvoiceItems(
    leaseId: number,
    invoiceId: number,
  ): Promise<InvoiceItem[]> {
    const lease = await this.leasesRepository.findOneWithRelations(leaseId);
    if (!lease) {
      throw new BadRequestException('Lease not found');
    }

    const invoiceItems: any[] = [];

    // Add rent item
    invoiceItems.push({
      invoiceId,
      description: `Rent for ${lease.unit.unitNumber}`,
      amount: lease.unit.baseRent,
      type: 'rent',
    });

    // Add parking fees
    const parkingSpaces = await this.leasesRepository.getParkingSpaces(leaseId);
    for (const parking of parkingSpaces) {
      invoiceItems.push({
        invoiceId,
        description: `Parking space ${parking.slotNumber}`,
        amount: parking.monthlyFee,
        type: 'parking',
      });
    }

    // Add service charges from building
    const serviceCharges = await this.leasesRepository.getServiceCharges(
      lease.unit.buildingId,
    );
    for (const serviceCharge of serviceCharges) {
      invoiceItems.push({
        invoiceId,
        description: `${serviceCharge.name} service charge`,
        amount: serviceCharge.monthlyFee,
        type: 'service_charge',
      });
    }

    // Create all invoice items
    const createdItems: InvoiceItem[] = [];
    for (const item of invoiceItems) {
      const createdItem = await this.invoiceItemsService.create(item);
      createdItems.push(createdItem);
    }

    return createdItems;
  }
}
