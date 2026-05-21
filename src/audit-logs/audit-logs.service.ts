import { Injectable } from '@nestjs/common';
import { BaseService } from '../core/common/base.service';
import { AuditLogsRepository } from './audit-logs.repository';
import { AuditLog } from '../../generated/prisma';

@Injectable()
export class AuditLogsService extends BaseService<AuditLog> {
  constructor(private auditLogsRepository: AuditLogsRepository) {
    super(auditLogsRepository);
  }

  async findByUser(userId: number): Promise<AuditLog[]> {
    return this.auditLogsRepository.findByUser(userId);
  }

  async findByAction(action: string): Promise<AuditLog[]> {
    return this.auditLogsRepository.findByAction(action);
  }

  async findByTable(tableName: string): Promise<AuditLog[]> {
    return this.auditLogsRepository.findByTable(tableName);
  }

  async findByRecord(tableName: string, recordId: number): Promise<AuditLog[]> {
    return this.auditLogsRepository.findByRecord(tableName, recordId);
  }

  async logAction(data: {
    userId: number;
    action: string;
    tableName: string;
    recordId: number;
    beforeData?: any;
    afterData?: any;
    note?: string;
  }): Promise<AuditLog> {
    return this.auditLogsRepository.create(data);
  }

  async findRecentActions(limit: number = 50): Promise<AuditLog[]> {
    return this.auditLogsRepository.findRecentActions(limit);
  }
}
