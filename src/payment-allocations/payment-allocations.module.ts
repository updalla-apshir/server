import { forwardRef, Module } from '@nestjs/common';
import { DatabaseModule } from '../core/database/database.module';
import { PaymentAllocationsController } from './payment-allocations.controller';
import { PaymentAllocationsService } from './payment-allocations.service';
import { PaymentAllocationsRepository } from './payment-allocations.repository';
import { InvoicesModule } from '../invoices/invoices.module';
import { PaymentsModule } from '../payments/payments.module';
import { ReceiptsModule } from '../receipts/receipts.module';

@Module({
  imports: [DatabaseModule, InvoicesModule, forwardRef(() => PaymentsModule), ReceiptsModule],
  controllers: [PaymentAllocationsController],
  providers: [PaymentAllocationsService, PaymentAllocationsRepository],
  exports: [PaymentAllocationsService, PaymentAllocationsRepository],
})
export class PaymentAllocationsModule {}
