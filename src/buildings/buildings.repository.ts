import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../core/common/base.repository';
import { PrismaService } from '../core/database/prisma.service';
import { Building } from '../../generated/prisma';

@Injectable()
export class BuildingsRepository extends BaseRepository<Building> {
  constructor(prisma: PrismaService) {
    super(prisma, 'building');
  }

  protected getChildRelations() {
    return [
      { modelName: 'invoiceItem', where: (id: number) => ({ invoice: { lease: { unit: { buildingId: id } } } }) },
      { modelName: 'paymentAllocation', where: (id: number) => ({ invoice: { lease: { unit: { buildingId: id } } } }) },
      { modelName: 'invoice', where: (id: number) => ({ lease: { unit: { buildingId: id } } }) },
      { modelName: 'leaseStatusHistory', where: (id: number) => ({ lease: { unit: { buildingId: id } } }) },
      { modelName: 'lease', where: (id: number) => ({ unit: { buildingId: id } }) },
      { modelName: 'unit', where: (id: number) => ({ buildingId: id }) },
      { modelName: 'serviceCharge', where: (id: number) => ({ buildingId: id }) },
      { modelName: 'parkingSpace', where: (id: number) => ({ buildingId: id }) },
    ];
  }

  async findByProperty(propertyId: number): Promise<Building[]> {
    return this.prisma.building.findMany({
      where: { propertyId },
    });
  }

  async findByType(type: string): Promise<Building[]> {
    return this.prisma.building.findMany({
      where: { type: type as any },
    });
  }
}
