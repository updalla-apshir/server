import { Module } from '@nestjs/common';
import { DatabaseModule } from '../core/database/database.module';
import { InvoiceItemsController } from './invoice-items.controller';
import { InvoiceItemsService } from './invoice-items.service';
import { InvoiceItemsRepository } from './invoice-items.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [InvoiceItemsController],
  providers: [InvoiceItemsService, InvoiceItemsRepository],
  exports: [InvoiceItemsService, InvoiceItemsRepository],
})
export class InvoiceItemsModule {}
