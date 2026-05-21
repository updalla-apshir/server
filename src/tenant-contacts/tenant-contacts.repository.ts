import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../core/common/base.repository';
import { PrismaService } from '../core/database/prisma.service';
import { TenantContact } from '../../generated/prisma';

@Injectable()
export class TenantContactsRepository extends BaseRepository<TenantContact> {
  constructor(prisma: PrismaService) {
    super(prisma, 'tenantContact');
  }

  async findByTenant(tenantId: number): Promise<TenantContact[]> {
    return this.prisma.tenantContact.findMany({
      where: { tenantId },
    });
  }

  async findByRole(role: string): Promise<TenantContact[]> {
    return this.prisma.tenantContact.findMany({
      where: { role: role as any },
    });
  }

  async findPrimaryContacts(tenantId: number): Promise<TenantContact[]> {
    return this.prisma.tenantContact.findMany({
      where: {
        tenantId,
        role: 'primary',
      },
    });
  }

  async findEmergencyContacts(tenantId: number): Promise<TenantContact[]> {
    return this.prisma.tenantContact.findMany({
      where: {
        tenantId,
        role: 'emergency',
      },
    });
  }
}
