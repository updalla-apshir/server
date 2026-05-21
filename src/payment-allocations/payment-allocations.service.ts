import {
  Inject,
  Injectable,
  BadRequestException,
  forwardRef,
} from '@nestjs/common';
import { BaseService } from '../core/common/base.service';
import { PaymentAllocationsRepository } from './payment-allocations.repository';
import { PaymentAllocation } from '../../generated/prisma';
import { InvoicesService } from '../invoices/invoices.service';
import { PaymentsService } from '../payments/payments.service';
import { ReceiptsService } from '../receipts/receipts.service';

@Injectable()
export class PaymentAllocationsService extends BaseService<PaymentAllocation> {
  constructor(
    private paymentAllocationsRepository: PaymentAllocationsRepository,
    private invoicesService: InvoicesService,
    @Inject(forwardRef(() => PaymentsService))
    private paymentsService: PaymentsService,
    private receiptsService: ReceiptsService,
  ) {
    super(paymentAllocationsRepository);
  }

  async create(data: any): Promise<PaymentAllocation> {
    return this.allocatePayment(data.paymentId, data.invoiceId, data.amountApplied);
  }

  async update(id: number, data: any): Promise<PaymentAllocation> {
    const allocation = await this.findOne(id);
    const oldAmount = Number(allocation.amountApplied);

    if (data.amountApplied !== undefined && data.amountApplied !== oldAmount) {
      const diff = data.amountApplied - oldAmount;

      const invoice = await this.invoicesService.findOne(allocation.invoiceId);
      const currentBalance = Number(invoice.balanceAmount);

      if (diff > 0 && diff > currentBalance) {
        throw new BadRequestException(
          `Amount increase (${diff}) exceeds invoice balance (${currentBalance})`,
        );
      }

      const newPaidAmount = Number(invoice.paidAmount) + diff;
      const newBalance = currentBalance - diff;
      const newStatus = newBalance <= 0 ? 'paid' : 'pending';

      await this.invoicesService.update(allocation.invoiceId, {
        paidAmount: Math.max(0, newPaidAmount),
        balanceAmount: newBalance,
        status: newStatus,
      });
    }

    if (data.paymentId !== undefined && data.paymentId !== allocation.paymentId) {
      const paymentId = data.paymentId;
      delete data.paymentId;
      return super.update(id, data).then((result) => {
        this.tryGenerateReceipt(paymentId);
        return result;
      });
    }

    return super.update(id, data);
  }

  async delete(id: number): Promise<PaymentAllocation> {
    const allocation = await this.findOne(id);

    const invoice = await this.invoicesService.findOne(allocation.invoiceId);

    const newPaidAmount = Number(invoice.paidAmount) - Number(allocation.amountApplied);
    const newBalance = Number(invoice.balanceAmount) + Number(allocation.amountApplied);
    const newStatus = invoice.status === 'paid' && newBalance > 0 ? 'pending' : invoice.status;

    await this.invoicesService.update(allocation.invoiceId, {
      paidAmount: Math.max(0, newPaidAmount),
      balanceAmount: newBalance,
      status: newStatus,
    });

    return super.delete(id);
  }

  async findByPayment(paymentId: number): Promise<PaymentAllocation[]> {
    return this.paymentAllocationsRepository.findByPayment(paymentId);
  }

  async findByInvoice(invoiceId: number): Promise<PaymentAllocation[]> {
    return this.paymentAllocationsRepository.findByInvoice(invoiceId);
  }

  async allocatePayment(
    paymentId: number,
    invoiceId: number,
    amount: number,
  ): Promise<PaymentAllocation> {
    const invoice = await this.invoicesService.findOne(invoiceId);
    const currentBalance = Number(invoice.balanceAmount);

    if (amount > currentBalance) {
      throw new BadRequestException(
        `Amount applied (${amount}) exceeds invoice balance (${currentBalance})`,
      );
    }

    const allocation = await this.paymentAllocationsRepository.allocatePayment(
      paymentId,
      invoiceId,
      amount,
    );

    const newPaidAmount = Number(invoice.paidAmount) + amount;
    const newBalance = currentBalance - amount;
    const newStatus = newBalance <= 0 ? 'paid' : 'pending';

    await this.invoicesService.update(invoiceId, {
      paidAmount: newPaidAmount,
      balanceAmount: newBalance,
      status: newStatus,
    });

    await this.tryGenerateReceipt(paymentId);

    return allocation;
  }

  async getTotalAllocated(paymentId: number): Promise<number> {
    return this.paymentAllocationsRepository.getTotalAllocated(paymentId);
  }

  async getTotalReceived(invoiceId: number): Promise<number> {
    return this.paymentAllocationsRepository.getTotalReceived(invoiceId);
  }

  private async tryGenerateReceipt(paymentId: number): Promise<void> {
    try {
      const payment = await this.paymentsService.findOne(paymentId);
      const totalAllocated = await this.getTotalAllocated(paymentId);

      if (totalAllocated >= Number(payment.amount)) {
        const existingReceipts = await this.receiptsService.findByPayment(paymentId);
        if (existingReceipts.length === 0) {
          await this.receiptsService.createWithNumber({
            paymentId,
            issuedAt: new Date(),
            totalAmount: Number(payment.amount),
          });
        }
      }
    } catch {
      // Silently fail – receipt generation is non-critical
    }
  }
}
