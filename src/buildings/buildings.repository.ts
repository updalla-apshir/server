import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../core/common/base.repository';
import { PrismaService } from '../core/database/prisma.service';
import { Building } from '../../generated/prisma';

@Injectable()
export class BuildingsRepository extends BaseRepository<Building> {
  constructor(prisma: PrismaService) {
    super(prisma, 'building');
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
