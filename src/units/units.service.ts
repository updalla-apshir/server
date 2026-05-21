import { Injectable, BadRequestException } from '@nestjs/common';
import { BaseService } from '../core/common/base.service';
import { UnitsRepository } from './units.repository';
import { Unit } from '../../generated/prisma';

@Injectable()
export class UnitsService extends BaseService<Unit> {
  constructor(private unitsRepository: UnitsRepository) {
    super(unitsRepository);
  }

  async findByBuilding(buildingId: number): Promise<Unit[]> {
    return this.unitsRepository.findByBuilding(buildingId);
  }

  async findAvailable(): Promise<Unit[]> {
    return this.unitsRepository.findAvailable();
  }

  async findByStatus(status: string): Promise<Unit[]> {
    return this.unitsRepository.findByStatus(status);
  }

  async findAll(
    options?: any,
    sort?: any,
    filters?: any,
  ): Promise<{ data: Unit[]; total: number; page: number; limit: number }> {
    return super.findAll(options, sort, filters, {
      building: true,
    });
  }

  async create(data: any): Promise<Unit> {
    try {
      console.log('UnitsService.create called with:', data);
      const unit = await this.unitsRepository.create(data);
      console.log('Created unit:', unit);
      const result = await this.unitsRepository.findOne(unit.id, {
        building: true,
      });
      console.log('Fetched unit with building:', result);
      if (!result) {
        throw new Error('Failed to fetch created unit');
      }
      return result;
    } catch (error) {
      console.error('Error creating unit:', error);
      throw new BadRequestException('Failed to create unit', error.message);
    }
  }

  async update(id: number, data: any): Promise<Unit> {
    const unit = await this.unitsRepository.update(id, data);
    return (await this.unitsRepository.findOne(unit.id, {
      building: true,
    }))!;
  }
}
