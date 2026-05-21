import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../core/common/base.repository';
import { PrismaService } from '../core/database/prisma.service';
import { Tenant } from '../../generated/prisma';

@Injectable()
export class TenantsRepository extends BaseRepository<Tenant> {
  constructor(prisma: PrismaService) {
    super(prisma, 'tenant');
  }

  async findByPhone(phone: string): Promise<Tenant[]> {
    return this.prisma.tenant.findMany({
      where: { phone },
    });
  }

  async findDebtOverview(): Promise<any[]> {
    return this.prisma.tenant.findMany({
      include: {
        leases: {
          include: {
            unit: {
              select: { unitNumber: true },
            },
            invoices: {
              where: {
                status: { in: ['pending', 'overdue'] },
              },
              select: {
                id: true,
                invoiceNumber: true,
                totalAmount: true,
                paidAmount: true,
                balanceAmount: true,
                dueDate: true,
                status: true,
              },
            },
          },
        },
      },
    });
  }

  async findTenantDebt(tenantId: number): Promise<any> {
    return this.prisma.tenant.findUnique({
      where: { id: tenantId },
      include: {
        leases: {
          include: {
            unit: {
              select: { unitNumber: true },
            },
            invoices: {
              where: {
                status: { in: ['pending', 'overdue'] },
              },
              select: {
                id: true,
                invoiceNumber: true,
                totalAmount: true,
                paidAmount: true,
                balanceAmount: true,
                dueDate: true,
                status: true,
              },
            },
          },
        },
      },
    });
  }
}
