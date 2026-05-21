import { Injectable } from '@nestjs/common';
import { BaseService } from '../core/common/base.service';
import { ServiceChargesRepository } from './service-charges.repository';
import { ServiceCharge } from '../../generated/prisma';
import type { CreateServiceChargeDto } from './dto/create-service-charge.dto';
import type { UpdateServiceChargeDto } from './dto/create-service-charge.dto';

@Injectable()
export class ServiceChargesService extends BaseService<ServiceCharge> {
  constructor(private serviceChargesRepository: ServiceChargesRepository) {
    super(serviceChargesRepository);
  }

  async create(data: CreateServiceChargeDto): Promise<ServiceCharge> {
    return this.serviceChargesRepository.create(data);
  }

  findByBuilding(buildingId: number) {
    return this.serviceChargesRepository.findByBuilding(buildingId);
  }
}
