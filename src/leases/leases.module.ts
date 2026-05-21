import { Module } from '@nestjs/common';
import { DatabaseModule } from '../core/database/database.module';
import { LeasesController } from './leases.controller';
import { LeasesService } from './leases.service';
import { LeasesRepository } from './leases.repository';
import { LeaseStatusHistoryModule } from '../lease-status-history/lease-status-history.module';
import { InvoiceItemsModule } from '../invoice-items/invoice-items.module';

@Module({
  imports: [DatabaseModule, LeaseStatusHistoryModule, InvoiceItemsModule],
  controllers: [LeasesController],
  providers: [LeasesService, LeasesRepository],
  exports: [LeasesService, LeasesRepository],
})
export class LeasesModule {}
