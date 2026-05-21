import { Module } from '@nestjs/common';
import { DatabaseModule } from '../core/database/database.module';
import { TenantContactsController } from './tenant-contacts.controller';
import { TenantContactsService } from './tenant-contacts.service';
import { TenantContactsRepository } from './tenant-contacts.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [TenantContactsController],
  providers: [TenantContactsService, TenantContactsRepository],
  exports: [TenantContactsService, TenantContactsRepository],
})
export class TenantContactsModule {}
