import { Injectable } from '@nestjs/common';
import { BaseService } from '../core/common/base.service';
import { TenantsRepository } from './tenants.repository';
import { Tenant } from '../../generated/prisma';
import type { CreateTenantDto } from './dto/create-tenant.dto';
import type { UpdateTenantDto } from './dto/create-tenant.dto';

@Injectable()
export class TenantsService extends BaseService<Tenant> {
  constructor(private tenantsRepository: TenantsRepository) {
    super(tenantsRepository);
  }

  async create(data: CreateTenantDto): Promise<Tenant> {
    return this.tenantsRepository.create(data);
  }

  findByPhone(phone: string): Promise<Tenant[]> {
    return this.tenantsRepository.findByPhone(phone);
  }

  async getDebtOverview(): Promise<any[]> {
    const tenants = await this.tenantsRepository.findDebtOverview();
    return tenants.map((tenant: any) => {
      const unpaidInvoices: any[] = [];
      let totalOutstanding = 0;
      for (const lease of tenant.leases || []) {
        for (const inv of lease.invoices || []) {
          unpaidInvoices.push({
            id: inv.id,
            invoiceNumber: inv.invoiceNumber,
            unitNumber: lease.unit?.unitNumber,
            totalAmount: Number(inv.totalAmount),
            paidAmount: Number(inv.paidAmount),
            balanceAmount: Number(inv.balanceAmount),
            dueDate: inv.dueDate,
            status: inv.status,
          });
          totalOutstanding += Number(inv.balanceAmount);
        }
      }
      return {
        id: tenant.id,
        name: tenant.name,
        phone: tenant.phone,
        totalOutstanding,
        unpaidInvoices,
      };
    });
  }

  async getTenantDebt(tenantId: number): Promise<any> {
    const tenant = await this.tenantsRepository.findTenantDebt(tenantId);
    if (!tenant) return null;

    const unpaidInvoices: any[] = [];
    let totalOutstanding = 0;
    for (const lease of tenant.leases || []) {
      for (const inv of lease.invoices || []) {
        unpaidInvoices.push({
          id: inv.id,
          invoiceNumber: inv.invoiceNumber,
          unitNumber: lease.unit?.unitNumber,
          totalAmount: Number(inv.totalAmount),
          paidAmount: Number(inv.paidAmount),
          balanceAmount: Number(inv.balanceAmount),
          dueDate: inv.dueDate,
          status: inv.status,
        });
        totalOutstanding += Number(inv.balanceAmount);
      }
    }
    return {
      id: tenant.id,
      name: tenant.name,
      phone: tenant.phone,
      totalOutstanding,
      unpaidInvoices,
    };
  }
}
