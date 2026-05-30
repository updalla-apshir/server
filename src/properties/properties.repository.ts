import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../core/common/base.repository';
import { PrismaService } from '../core/database/prisma.service';
import { Property } from '../../generated/prisma';

@Injectable()
export class PropertiesRepository extends BaseRepository<Property> {
  constructor(prisma: PrismaService) {
    super(prisma, 'property');
  }

  protected getChildRelations() {
    return [
      { modelName: 'invoiceItem', where: (id: number) => ({ invoice: { lease: { unit: { building: { propertyId: id } } } } }) },
      { modelName: 'paymentAllocation', where: (id: number) => ({ invoice: { lease: { unit: { building: { propertyId: id } } } } }) },
      { modelName: 'invoice', where: (id: number) => ({ lease: { unit: { building: { propertyId: id } } } }) },
      { modelName: 'leaseStatusHistory', where: (id: number) => ({ lease: { unit: { building: { propertyId: id } } } }) },
      { modelName: 'lease', where: (id: number) => ({ unit: { building: { propertyId: id } } }) },
      { modelName: 'unit', where: (id: number) => ({ building: { propertyId: id } }) },
      { modelName: 'serviceCharge', where: (id: number) => ({ building: { propertyId: id } }) },
      { modelName: 'parkingSpace', where: (id: number) => ({ building: { propertyId: id } }) },
      { modelName: 'building', where: (id: number) => ({ propertyId: id }) },
    ];
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
