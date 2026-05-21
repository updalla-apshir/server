import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../core/common/base.repository';
import { PrismaService } from '../core/database/prisma.service';
import { Unit } from '../../generated/prisma';

@Injectable()
export class UnitsRepository extends BaseRepository<Unit> {
  constructor(prisma: PrismaService) {
    super(prisma, 'unit');
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
