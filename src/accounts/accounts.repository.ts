import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../core/common/base.repository';
import { PrismaService } from '../core/database/prisma.service';
import { Account } from '../../generated/prisma';

@Injectable()
export class AccountsRepository extends BaseRepository<Account> {
  constructor(prisma: PrismaService) {
    super(prisma, 'account');
  }

  protected getChildRelations() {
    return [
      { modelName: 'paymentAllocation', where: (id: number) => ({ payment: { accountId: id } }) },
      { modelName: 'receipt', where: (id: number) => ({ payment: { accountId: id } }) },
      { modelName: 'payment', where: (id: number) => ({ accountId: id }) },
    ];
  }
}
