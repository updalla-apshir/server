import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../core/common/base.repository';
import { PrismaService } from '../core/database/prisma.service';
import { Lease } from '../../generated/prisma';

@Injectable()
export class LeasesRepository extends BaseRepository<Lease> {
  constructor(prisma: PrismaService) {
    super(prisma, 'lease');
  }

  protected getChildRelations() {
    return [
      { modelName: 'invoiceItem', where: (id: number) => ({ invoice: { leaseId: id } }) },
      { modelName: 'paymentAllocation', where: (id: number) => ({ invoice: { leaseId: id } }) },
      { modelName: 'invoice', where: (id: number) => ({ leaseId: id }) },
      { modelName: 'leaseStatusHistory', where: (id: number) => ({ leaseId: id }) },
    ];
  }

  async findByTenant(tenantId: number): Promise<Lease[]> {
    return this.prisma.lease.findMany({
      where: { tenantId },
      include: {
        unit: {
          include: {
            building: true,
          },
        },
      },
    });
  }

  async findByUnit(unitId: number): Promise<Lease | null> {
    return this.prisma.lease.findUnique({
      where: { unitId },
      include: {
        tenant: true,
        unit: {
          include: {
            building: true,
          },
        },
      },
    });
  }

   async findActive(): Promise<Lease[]> {
     const now = new Date();
     return this.prisma.lease.findMany({
       where: {
         status: 'active',
         startDate: { lte: now },
         OR: [{ endDate: { equals: null } as any }, { endDate: { gte: now } }],
       },
       include: {
         tenant: true,
         unit: {
           include: {
             building: true,
           },
         },
       },
     });
   }

  async assignParkingSpaces(
    leaseId: number,
    parkingSpaceIds: number[],
  ): Promise<void> {
    await this.prisma.parkingSpace.updateMany({
      where: {
        id: { in: parkingSpaceIds },
        status: 'available', // Only assign available spaces
      },
      data: {
        leaseId: leaseId,
        status: 'assigned',
      },
    });
  }

  async unassignParkingSpaces(leaseId: number): Promise<void> {
    await this.prisma.parkingSpace.updateMany({
      where: {
        leaseId: leaseId,
      },
      data: {
        leaseId: null,
        status: 'available',
      },
    });
  }

  async getParkingSpaces(leaseId: number) {
    return this.prisma.parkingSpace.findMany({
      where: { leaseId },
    });
  }

  async getServiceCharges(buildingId: number) {
    return this.prisma.serviceCharge.findMany({
      where: { buildingId },
    });
  }

  async findOneWithRelations(leaseId: number) {
    return this.prisma.lease.findUnique({
      where: { id: leaseId },
      include: {
        unit: {
          include: {
            building: true,
          },
        },
        parkingSpaces: true,
      },
    });
  }
}
