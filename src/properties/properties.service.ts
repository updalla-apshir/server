import { Injectable } from '@nestjs/common';
import { BaseService } from '../core/common/base.service';
import { PropertiesRepository } from './properties.repository';
import { Property } from '../../generated/prisma';

@Injectable()
export class PropertiesService extends BaseService<Property> {
  constructor(private propertiesRepository: PropertiesRepository) {
    super(propertiesRepository);
  }

  async findWithBuildings(id: number): Promise<Property | null> {
    return this.propertiesRepository.findWithBuildings(id);
  }

  async findByCity(city: string): Promise<Property[]> {
    return this.propertiesRepository.findByCity(city);
  }
}
