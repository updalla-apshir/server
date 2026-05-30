import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../core/common/base.repository';
import { PrismaService } from '../core/database/prisma.service';
import { Unit } from '../../generated/prisma';

@Injectable()
export class UnitsRepository extends BaseRepository<Unit> {
  constructor(prisma: PrismaService) {
    super(prisma, 'unit');
  }

  protected getChildRelations() {
    return [
      { modelName: 'invoiceItem', where: (id: number) => ({ invoice: { lease: { unitId: id } } }) },
      { modelName: 'paymentAllocation', where: (id: number) => ({ invoice: { lease: { unitId: id } } }) },
      { modelName: 'invoice', where: (id: number) => ({ lease: { unitId: id } }) },
      { modelName: 'leaseStatusHistory', where: (id: number) => ({ lease: { unitId: id } }) },
      { modelName: 'lease', where: (id: number) => ({ unitId: id }) },
    ];
  }

  async findByBuilding(buildingId: number): Promise<Unit[]> {
    return this.prisma.unit.findMany({
      where: { buildingId },
    });
  }

  async findAvailable(): Promise<Unit[]> {
    return this.prisma.unit.findMany({
      where: { status: 'vacant' },
    });
  }

  async findByStatus(status: string): Promise<Unit[]> {
    return this.prisma.unit.findMany({
      where: { status: status as any },
    });
  }
}
