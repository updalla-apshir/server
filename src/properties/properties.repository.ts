import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../core/common/base.repository';
import { PrismaService } from '../core/database/prisma.service';
import { Property } from '../../generated/prisma';

@Injectable()
export class PropertiesRepository extends BaseRepository<Property> {
  constructor(prisma: PrismaService) {
    super(prisma, 'property');
  }

  async findWithBuildings(id: number): Promise<Property | null> {
    return this.prisma.property.findUnique({
      where: { id },
      include: {
        buildings: true,
      },
    });
  }

  async findByCity(city: string): Promise<Property[]> {
    return this.prisma.property.findMany({
      where: { city },
    });
  }
}
