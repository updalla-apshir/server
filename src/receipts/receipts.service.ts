import { Injectable } from '@nestjs/common';
import { BaseService } from '../core/common/base.service';
import { ReceiptsRepository } from './receipts.repository';
import { Receipt } from '../../generated/prisma';

@Injectable()
export class ReceiptsService extends BaseService<Receipt> {
  constructor(private receiptsRepository: ReceiptsRepository) {
    super(receiptsRepository);
  }

  async findByPayment(paymentId: number): Promise<Receipt[]> {
    return this.receiptsRepository.findByPayment(paymentId);
  }

  async findByNumber(receiptNumber: string): Promise<Receipt | null> {
    return this.receiptsRepository.findByNumber(receiptNumber);
  }

  async generateReceiptNumber(): Promise<string> {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const count = await this.receiptsRepository.countByMonth(
      year,
      now.getMonth() + 1,
    );
    return `RCP-${year}${month}-${String(count + 1).padStart(4, '0')}`;
  }

  async createWithNumber(data: {
    paymentId: number;
    issuedAt: Date;
    totalAmount: number;
  }): Promise<Receipt> {
    const receiptNumber = await this.generateReceiptNumber();
    return this.receiptsRepository.create({
      ...data,
      receiptNumber,
    });
  }
}
