import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../core/common/base.repository';
import { PrismaService } from '../core/database/prisma.service';
import { Account } from '../../generated/prisma';

@Injectable()
export class AccountsRepository extends BaseRepository<Account> {
  constructor(prisma: PrismaService) {
    super(prisma, 'account');
  }
}
