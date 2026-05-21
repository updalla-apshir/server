import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../core/common/base.repository';
import { PrismaService } from '../core/database/prisma.service';
import { InvoiceItem } from '../../generated/prisma';

@Injectable()
export class InvoiceItemsRepository extends BaseRepository<InvoiceItem> {
  constructor(prisma: PrismaService) {
    super(prisma, 'invoiceItem');
  }

  async findByInvoice(invoiceId: number): Promise<InvoiceItem[]> {
    return this.prisma.invoiceItem.findMany({
      where: { invoiceId },
    });
  }

  async findByType(type: string): Promise<InvoiceItem[]> {
    return this.prisma.invoiceItem.findMany({
      where: { type: type as any },
    });
  }

  async calculateTotalByInvoice(invoiceId: number): Promise<number> {
    const result = await this.prisma.invoiceItem.aggregate({
      where: { invoiceId },
      _sum: {
        amount: true,
      },
    });
    return result._sum.amount?.toNumber() || 0;
  }
}
