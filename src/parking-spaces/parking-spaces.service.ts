import { Injectable } from '@nestjs/common';
import { BaseService } from '../core/common/base.service';
import { ParkingSpacesRepository } from './parking-spaces.repository';
import { ParkingSpace } from '../../generated/prisma';

@Injectable()
export class ParkingSpacesService extends BaseService<ParkingSpace> {
  constructor(private parkingSpacesRepository: ParkingSpacesRepository) {
    super(parkingSpacesRepository);
  }

  async findByBuilding(buildingId: number): Promise<ParkingSpace[]> {
    return this.parkingSpacesRepository.findByBuilding(buildingId);
  }

  async findByStatus(status: string): Promise<ParkingSpace[]> {
    return this.parkingSpacesRepository.findByStatus(status);
  }

  async findAvailable(): Promise<ParkingSpace[]> {
    return this.parkingSpacesRepository.findAvailable();
  }

  async assignToLease(id: number, leaseId: number): Promise<ParkingSpace> {
    return this.parkingSpacesRepository.assignToLease(id, leaseId);
  }

  async unassignFromLease(id: number): Promise<ParkingSpace> {
    return this.parkingSpacesRepository.unassignFromLease(id);
  }
}
