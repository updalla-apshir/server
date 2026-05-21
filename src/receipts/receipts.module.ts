import { Module } from '@nestjs/common';
import { DatabaseModule } from '../core/database/database.module';
import { ReceiptsController } from './receipts.controller';
import { ReceiptsService } from './receipts.service';
import { ReceiptsRepository } from './receipts.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [ReceiptsController],
  providers: [ReceiptsService, ReceiptsRepository],
  exports: [ReceiptsService, ReceiptsRepository],
})
export class ReceiptsModule {}
