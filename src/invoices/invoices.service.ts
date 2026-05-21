import { Injectable } from '@nestjs/common';
import { BaseService } from '../core/common/base.service';
import { InvoicesRepository } from './invoices.repository';
import { Invoice } from '../../generated/prisma';
import { LeasesService } from '../leases/leases.service';
import type { CreateInvoiceDto } from './dto/create-invoice.dto';
import type { UpdateInvoiceDto } from './dto/create-invoice.dto';

@Injectable()
export class InvoicesService extends BaseService<Invoice> {
  constructor(
    private invoicesRepository: InvoicesRepository,
    private leasesService: LeasesService,
  ) {
    super(invoicesRepository);
  }

  async findAll(pagination: any = { page: 1, limit: 10 }, sort?: any, filters?: any, include?: any) {
    await this.markOverdue();
    return super.findAll(pagination, sort, filters, include);
  }

  async findByLease(leaseId: number) {
    await this.markOverdue();
    return this.invoicesRepository.findByLease(leaseId);
  }

  async findByStatus(status: string) {
    await this.markOverdue();
    return this.invoicesRepository.findByStatus(status);
  }

  async markOverdue(): Promise<number> {
    return this.invoicesRepository.markOverdue();
  }

  async create(data: CreateInvoiceDto): Promise<Invoice> {
    // Generate invoice items from lease data
    const invoice = await this.invoicesRepository.create({
      ...data,
      status: 'pending',
      totalAmount: 0, // Will be calculated from items
      balanceAmount: 0,
      paidAmount: 0,
    });

    // Generate invoice items from lease
    const invoiceItems = await this.leasesService.generateInvoiceItems(
      data.leaseId,
      invoice.id,
    );

    // Calculate total amount from generated items
    const totalAmount = invoiceItems.reduce(
      (sum, item) => sum + Number(item.amount),
      0,
    );

    // Update invoice with calculated total
    return this.invoicesRepository.update(invoice.id, {
      totalAmount,
      balanceAmount: totalAmount,
    });
  }

}
