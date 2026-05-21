import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../core/common/base.repository';
import { PrismaService } from '../core/database/prisma.service';
import { Payment } from '../../generated/prisma';

@Injectable()
export class PaymentsRepository extends BaseRepository<Payment> {
  constructor(prisma: PrismaService) {
    super(prisma, 'payment');
  }

  findByTenant(tenantId: number) {
    return this.prisma.payment.findMany({
      where: { tenantId },
      orderBy: { paymentDate: 'desc' },
    });
  }

  findByAccount(accountId: number) {
    return this.prisma.payment.findMany({
      where: { accountId },
      orderBy: { paymentDate: 'desc' },
    });
  }
}
