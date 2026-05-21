import { Injectable } from '@nestjs/common';
import { BaseService } from '../core/common/base.service';
import { TenantContactsRepository } from './tenant-contacts.repository';
import { TenantContact } from '../../generated/prisma';

@Injectable()
export class TenantContactsService extends BaseService<TenantContact> {
  constructor(private tenantContactsRepository: TenantContactsRepository) {
    super(tenantContactsRepository);
  }

  async findByTenant(tenantId: number): Promise<TenantContact[]> {
    return this.tenantContactsRepository.findByTenant(tenantId);
  }

  async findByRole(role: string): Promise<TenantContact[]> {
    return this.tenantContactsRepository.findByRole(role);
  }

  async findPrimaryContacts(tenantId: number): Promise<TenantContact[]> {
    return this.tenantContactsRepository.findPrimaryContacts(tenantId);
  }

  async findEmergencyContacts(tenantId: number): Promise<TenantContact[]> {
    return this.tenantContactsRepository.findEmergencyContacts(tenantId);
  }
}
