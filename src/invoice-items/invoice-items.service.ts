import { Injectable } from '@nestjs/common';
import { BaseService } from '../core/common/base.service';
import { InvoiceItemsRepository } from './invoice-items.repository';
import { InvoiceItem } from '../../generated/prisma';

@Injectable()
export class InvoiceItemsService extends BaseService<InvoiceItem> {
  constructor(private invoiceItemsRepository: InvoiceItemsRepository) {
    super(invoiceItemsRepository);
  }

  async findByInvoice(invoiceId: number): Promise<InvoiceItem[]> {
    return this.invoiceItemsRepository.findByInvoice(invoiceId);
  }

  async findByType(type: string): Promise<InvoiceItem[]> {
    return this.invoiceItemsRepository.findByType(type);
  }

  async calculateTotalByInvoice(invoiceId: number): Promise<number> {
    return this.invoiceItemsRepository.calculateTotalByInvoice(invoiceId);
  }
}
