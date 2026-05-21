import { Injectable } from '@nestjs/common';
import { BaseService } from '../core/common/base.service';
import { AccountsRepository } from './accounts.repository';
import { Account } from '../../generated/prisma';
import type { CreateAccountDto } from './dto/create-account.dto';
import type { UpdateAccountDto } from './dto/create-account.dto';

@Injectable()
export class AccountsService extends BaseService<Account> {
  constructor(private accountsRepository: AccountsRepository) {
    super(accountsRepository);
  }

  async create(data: CreateAccountDto): Promise<Account> {
    return this.accountsRepository.create(data);
  }

  async findByType(type: string): Promise<Account[]> {
    return this.accountsRepository.findAll({ where: { type: type as any } });
  }

  async findByStatus(status: string): Promise<Account[]> {
    return this.accountsRepository.findAll({ where: { status: status as any } });
  }
}
