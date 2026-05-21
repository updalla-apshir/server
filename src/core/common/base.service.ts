import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { BaseRepository } from './base.repository';
import { PaginationOptions } from '../../shared/types/common';

export interface IService<T> {
  findAll(
    pagination?: PaginationOptions,
    sort?: any,
    filters?: any,
    include?: any,
  ): Promise<{ data: T[]; total: number; page: number; limit: number }>;
  findOne(id: number): Promise<T>;
  create(data: any): Promise<T>;
  update(id: number, data: any): Promise<T>;
  delete(id: number): Promise<T>;
}

@Injectable()
export class BaseService<T> implements IService<T> {
  constructor(protected repository: BaseRepository<T>) {}

  async findAll(
    pagination: PaginationOptions = { page: 1, limit: 10 },
    sort?: any,
    filters?: any,
    include?: any,
  ): Promise<{ data: T[]; total: number; page: number; limit: number }> {
    const { page, limit } = pagination;
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.repository.findAll({
        skip,
        take: limit,
        where: filters,
        orderBy: sort ? { [sort.field]: sort.order } : undefined,
        include,
      }),
      this.repository.count(filters),
    ]);

    return {
      data,
      total,
      page,
      limit,
    };
  }

  async findOne(id: number): Promise<T> {
    const entity = await this.repository.findOne(id);
    if (!entity) {
      throw new NotFoundException(`Entity with ID ${id} not found`);
    }
    return entity;
  }

  async create(data: any): Promise<T> {
    try {
      const result = await this.repository.create(data);
      // Ensure the created entity is immediately available for subsequent reads
      // by forcing a database refresh if using read replicas
      await this.repository.findOne((result as any).id);
      return result;
    } catch (error) {
      throw new BadRequestException('Failed to create entity', error.message);
    }
  }

  async update(id: number, data: any): Promise<T> {
    try {
      await this.findOne(id); // Check if exists
      return await this.repository.update(id, data);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Failed to update entity', error.message);
    }
  }

  async delete(id: number): Promise<T> {
    try {
      await this.findOne(id); // Check if exists
      return await this.repository.delete(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Failed to delete entity', error.message);
    }
  }
}
