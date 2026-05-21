import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../core/common/base.repository';
import { PrismaService } from '../core/database/prisma.service';
import { Receipt } from '../../generated/prisma';

@Injectable()
export class ReceiptsRepository extends BaseRepository<Receipt> {
  constructor(prisma: PrismaService) {
    super(prisma, 'receipt');
  }

  async findByPayment(paymentId: number): Promise<Receipt[]> {
    return this.prisma.receipt.findMany({
      where: { paymentId },
      include: {
        payment: {
          include: {
            tenant: true,
            account: true,
          },
        },
      },
    });
  }

  async findByNumber(receiptNumber: string): Promise<Receipt | null> {
    return this.prisma.receipt.findFirst({
      where: { receiptNumber },
      include: {
        payment: {
          include: {
            tenant: true,
            account: true,
          },
        },
      },
    });
  }

  async countByMonth(year: number, month: number): Promise<number> {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 1);

    return this.prisma.receipt.count({
      where: {
        issuedAt: {
          gte: startDate,
          lt: endDate,
        },
      },
    });
  }
}
