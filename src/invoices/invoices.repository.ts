import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../core/common/base.repository';
import { PrismaService } from '../core/database/prisma.service';
import { Invoice } from '../../generated/prisma';

@Injectable()
export class InvoicesRepository extends BaseRepository<Invoice> {
  constructor(prisma: PrismaService) {
    super(prisma, 'invoice');
  }

  findByLease(leaseId: number) {
    return this.prisma.invoice.findMany({
      where: { leaseId },
      orderBy: { issueDate: 'desc' },
    });
  }

  findByStatus(status: string) {
    return this.prisma.invoice.findMany({
      where: { status: status as any },
    });
  }

  async markOverdue(): Promise<number> {
    const now = new Date();
    const result = await this.prisma.invoice.updateMany({
      where: {
        status: 'pending',
        dueDate: { lt: now },
      },
      data: {
        status: 'overdue',
      },
    });
    return result.count;
  }
}
