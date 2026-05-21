import { Module } from '@nestjs/common';
import { DatabaseModule } from '../core/database/database.module';
import { InvoicesController } from './invoices.controller';
import { InvoicesService } from './invoices.service';
import { InvoicesRepository } from './invoices.repository';
import { LeasesModule } from '../leases/leases.module';

@Module({
  imports: [DatabaseModule, LeasesModule],
  controllers: [InvoicesController],
  providers: [InvoicesService, InvoicesRepository],
  exports: [InvoicesService, InvoicesRepository],
})
export class InvoicesModule {}
