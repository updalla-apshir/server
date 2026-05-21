import { Injectable, BadRequestException } from '@nestjs/common';
import { BaseService } from '../core/common/base.service';
import { BuildingsRepository } from './buildings.repository';
import { Building } from '../../generated/prisma';

@Injectable()
export class BuildingsService extends BaseService<Building> {
  constructor(private buildingsRepository: BuildingsRepository) {
    super(buildingsRepository);
  }

  async findByProperty(propertyId: number): Promise<Building[]> {
    return this.buildingsRepository.findByProperty(propertyId);
  }

  async findByType(type: string): Promise<Building[]> {
    return this.buildingsRepository.findByType(type);
  }

  async findAll(
    options?: any,
    sort?: any,
    filters?: any,
  ): Promise<{ data: Building[]; total: number; page: number; limit: number }> {
    return super.findAll(options, sort, filters, {
      property: true,
    });
  }

  async create(data: any): Promise<Building> {
    try {
      const building = await this.buildingsRepository.create(data);
      const result = await this.buildingsRepository.findOne(building.id, {
        property: true,
      });
      if (!result) {
        throw new Error('Failed to fetch created building');
      }
      return result;
    } catch (error) {
      console.error('Error creating building:', error);
      throw new BadRequestException('Failed to create building', error.message);
    }
  }

  async update(id: number, data: any): Promise<Building> {
    try {
      const building = await this.buildingsRepository.update(id, data);
      const result = await this.buildingsRepository.findOne(building.id, {
        property: true,
      });
      if (!result) {
        throw new Error('Failed to fetch updated building');
      }
      return result;
    } catch (error) {
      console.error('Error updating building:', error);
      throw new BadRequestException('Failed to update building', error.message);
    }
  }
}
