import { Inject, Injectable, forwardRef, BadRequestException } from '@nestjs/common';
import { BaseService } from '../core/common/base.service';
import { PaymentsRepository } from './payments.repository';
import { Payment } from '../../generated/prisma';
import { AccountsService } from '../accounts/accounts.service';
import { InvoicesService } from '../invoices/invoices.service';
import { PaymentAllocationsService } from '../payment-allocations/payment-allocations.service';
import type { CreatePaymentDto } from './dto/create-payment.dto';
import type { UpdatePaymentDto } from './dto/create-payment.dto';

@Injectable()
export class PaymentsService extends BaseService<Payment> {
  constructor(
    private paymentsRepository: PaymentsRepository,
    private accountsService: AccountsService,
    private invoicesService: InvoicesService,
    @Inject(forwardRef(() => PaymentAllocationsService))
    private paymentAllocationsService: PaymentAllocationsService,
  ) {
    super(paymentsRepository);
  }

  async create(data: CreatePaymentDto): Promise<Payment> {
    const { invoiceId, ...paymentData } = data;

    if (invoiceId) {
      const invoice = await this.invoicesService.findOne(invoiceId);
      const currentBalance = Number(invoice.balanceAmount);
      if (Number(data.amount) > currentBalance) {
        throw new BadRequestException(
          `Amount applied (${data.amount}) exceeds invoice balance (${currentBalance})`,
        );
      }
    }

    const payment = await this.paymentsRepository.create(paymentData);
    const account = await this.accountsService.findOne(data.accountId);
    await this.accountsService.update(data.accountId, {
      balance: Number(account.balance) + Number(data.amount),
    });

    if (invoiceId) {
      await this.paymentAllocationsService.allocatePayment(
        payment.id,
        invoiceId,
        Number(data.amount),
      );
    }

    return payment;
  }

  async delete(id: number): Promise<Payment> {
    const payment = await this.findOne(id);
    const account = await this.accountsService.findOne(payment.accountId);
    await this.accountsService.update(payment.accountId, {
      balance: Math.max(0, Number(account.balance) - Number(payment.amount)),
    });
    return super.delete(id);
  }

  findByTenant(tenantId: number) {
    return this.paymentsRepository.findByTenant(tenantId);
  }

  findByAccount(accountId: number) {
    return this.paymentsRepository.findByAccount(accountId);
  }
}
