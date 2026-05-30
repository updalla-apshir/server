import { forwardRef, Module } from '@nestjs/common';
import { DatabaseModule } from '../core/database/database.module';
import { AccountsModule } from '../accounts/accounts.module';
import { InvoicesModule } from '../invoices/invoices.module';
import { PaymentAllocationsModule } from '../payment-allocations/payment-allocations.module';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';
import { PaymentsRepository } from './payments.repository';

@Module({
  imports: [DatabaseModule, AccountsModule, InvoicesModule, forwardRef(() => PaymentAllocationsModule)],
  controllers: [PaymentsController],
  providers: [PaymentsService, PaymentsRepository],
  exports: [PaymentsService, PaymentsRepository],
})
export class PaymentsModule {}
