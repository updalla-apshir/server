import { Injectable } from '@nestjs/common';
import { BaseService } from '../core/common/base.service';
import { LeaseStatusHistoryRepository } from './lease-status-history.repository';
import { LeaseStatusHistory } from '../../generated/prisma';

@Injectable()
export class LeaseStatusHistoryService extends BaseService<LeaseStatusHistory> {
  constructor(
    private leaseStatusHistoryRepository: LeaseStatusHistoryRepository,
  ) {
    super(leaseStatusHistoryRepository);
  }

  async findByLease(leaseId: number): Promise<LeaseStatusHistory[]> {
    return this.leaseStatusHistoryRepository.findByLease(leaseId);
  }

  async findByChangedBy(userId: number): Promise<LeaseStatusHistory[]> {
    return this.leaseStatusHistoryRepository.findByChangedBy(userId);
  }

  async findByStatus(status: string): Promise<LeaseStatusHistory[]> {
    return this.leaseStatusHistoryRepository.findByStatus(status);
  }

  async recordStatusChange(data: {
    leaseId: number;
    oldStatus: string | null;
    newStatus: string;
    changedBy: number;
    note?: string;
  }): Promise<LeaseStatusHistory> {
    return this.leaseStatusHistoryRepository.create({
      ...data,
      changedAt: new Date(),
    });
  }

  async getStatusTimeline(leaseId: number): Promise<LeaseStatusHistory[]> {
    return this.leaseStatusHistoryRepository.getStatusTimeline(leaseId);
  }
}
