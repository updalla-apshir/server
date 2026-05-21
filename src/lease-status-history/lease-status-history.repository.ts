import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../core/common/base.repository';
import { PrismaService } from '../core/database/prisma.service';
import { LeaseStatusHistory } from '../../generated/prisma';

@Injectable()
export class LeaseStatusHistoryRepository extends BaseRepository<LeaseStatusHistory> {
  constructor(prisma: PrismaService) {
    super(prisma, 'leaseStatusHistory');
  }

  async findByLease(leaseId: number): Promise<LeaseStatusHistory[]> {
    return this.prisma.leaseStatusHistory.findMany({
      where: { leaseId },
      orderBy: { changedAt: 'desc' },
      include: {
        lease: true,
      },
    });
  }

  async findByChangedBy(userId: number): Promise<LeaseStatusHistory[]> {
    return this.prisma.leaseStatusHistory.findMany({
      where: { changedBy: userId },
      orderBy: { changedAt: 'desc' },
      include: {
        lease: true,
      },
    });
  }

  async findByStatus(status: string): Promise<LeaseStatusHistory[]> {
    return this.prisma.leaseStatusHistory.findMany({
      where: { newStatus: status as any },
      orderBy: { changedAt: 'desc' },
      include: {
        lease: true,
      },
    });
  }

  async getStatusTimeline(leaseId: number): Promise<LeaseStatusHistory[]> {
    return this.prisma.leaseStatusHistory.findMany({
      where: { leaseId },
      orderBy: { changedAt: 'asc' },
      include: {
        lease: true,
      },
    });
  }
}
