import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../core/common/base.repository';
import { PrismaService } from '../core/database/prisma.service';
import { PaymentAllocation } from '../../generated/prisma';

@Injectable()
export class PaymentAllocationsRepository extends BaseRepository<PaymentAllocation> {
  constructor(prisma: PrismaService) {
    super(prisma, 'paymentAllocation');
  }

  async findByPayment(paymentId: number): Promise<PaymentAllocation[]> {
    return this.prisma.paymentAllocation.findMany({
      where: { paymentId },
      include: {
        invoice: true,
      },
    });
  }

  async findByInvoice(invoiceId: number): Promise<PaymentAllocation[]> {
    return this.prisma.paymentAllocation.findMany({
      where: { invoiceId },
      include: {
        payment: true,
      },
    });
  }

  async allocatePayment(
    paymentId: number,
    invoiceId: number,
    amount: number,
  ): Promise<PaymentAllocation> {
    return this.prisma.paymentAllocation.create({
      data: {
        paymentId,
        invoiceId,
        amountApplied: amount,
      },
      include: {
        payment: true,
        invoice: true,
      },
    });
  }

  async getTotalAllocated(paymentId: number): Promise<number> {
    const result = await this.prisma.paymentAllocation.aggregate({
      where: { paymentId },
      _sum: {
        amountApplied: true,
      },
    });
    return result._sum.amountApplied?.toNumber() || 0;
  }

  async getTotalReceived(invoiceId: number): Promise<number> {
    const result = await this.prisma.paymentAllocation.aggregate({
      where: { invoiceId },
      _sum: {
        amountApplied: true,
      },
    });
    return result._sum.amountApplied?.toNumber() || 0;
  }
}
