import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class BaseRepository<T> {
  protected model: any;

  constructor(
    protected prisma: PrismaService,
    modelName: string,
  ) {
    this.model = (this.prisma as any)[modelName];
  }

  async findAll(
    options: {
      skip?: number;
      take?: number;
      where?: any;
      orderBy?: any;
      include?: any;
    } = {},
  ): Promise<T[]> {
    // Only include defined options in the query, and skip 0 is not meaningful
    const queryOptions: any = {};

    if (options.skip !== undefined && options.skip > 0)
      queryOptions.skip = options.skip;
    if (options.take !== undefined && options.take > 0)
      queryOptions.take = options.take;
    if (options.where !== undefined) queryOptions.where = options.where;
    if (options.orderBy !== undefined) queryOptions.orderBy = options.orderBy;
    if (options.include !== undefined) queryOptions.include = options.include;

    return this.model.findMany(queryOptions);
  }

  async findOne(id: number, include?: any): Promise<T | null> {
    return this.model.findUnique({
      where: { id },
      include,
    });
  }

  async findByCondition(where: any, include?: any): Promise<T | null> {
    return this.model.findFirst({
      where,
      include,
    });
  }

  async create(data: any): Promise<T> {
    return this.model.create({ data });
  }

  async update(id: number, data: any): Promise<T> {
    return this.model.update({
      where: { id },
      data,
    });
  }

  async delete(id: number): Promise<T> {
    return this.model.delete({
      where: { id },
    });
  }

  async count(where?: any): Promise<number> {
    return this.model.count({ where });
  }
}
