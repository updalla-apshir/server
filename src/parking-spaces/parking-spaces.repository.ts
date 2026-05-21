import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../core/common/base.repository';
import { PrismaService } from '../core/database/prisma.service';
import { ParkingSpace } from '../../generated/prisma';

@Injectable()
export class ParkingSpacesRepository extends BaseRepository<ParkingSpace> {
  constructor(prisma: PrismaService) {
    super(prisma, 'parkingSpace');
  }

  async findByBuilding(buildingId: number): Promise<ParkingSpace[]> {
    return this.prisma.parkingSpace.findMany({
      where: { buildingId },
    });
  }

  async findByStatus(status: string): Promise<ParkingSpace[]> {
    return this.prisma.parkingSpace.findMany({
      where: { status: status as any },
    });
  }

  async findAvailable(): Promise<ParkingSpace[]> {
    return this.prisma.parkingSpace.findMany({
      where: { status: 'available' },
    });
  }

  async assignToLease(id: number, leaseId: number): Promise<ParkingSpace> {
    return this.prisma.parkingSpace.update({
      where: { id },
      data: {
        leaseId,
        status: 'assigned',
      },
    });
  }

  async unassignFromLease(id: number): Promise<ParkingSpace> {
    return this.prisma.parkingSpace.update({
      where: { id },
      data: {
        leaseId: null,
        status: 'available',
      },
    });
  }
}
