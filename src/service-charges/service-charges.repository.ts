import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../core/common/base.repository';
import { PrismaService } from '../core/database/prisma.service';
import { ServiceCharge } from '../../generated/prisma';

@Injectable()
export class ServiceChargesRepository extends BaseRepository<ServiceCharge> {
  constructor(prisma: PrismaService) {
    super(prisma, 'serviceCharge');
  }

  findByBuilding(buildingId: number) {
    return this.prisma.serviceCharge.findMany({
      where: { buildingId },
    });
  }
}
