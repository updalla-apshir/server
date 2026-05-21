import { Module } from '@nestjs/common';
import { DatabaseModule } from '../core/database/database.module';
import { LeaseStatusHistoryController } from './lease-status-history.controller';
import { LeaseStatusHistoryService } from './lease-status-history.service';
import { LeaseStatusHistoryRepository } from './lease-status-history.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [LeaseStatusHistoryController],
  providers: [LeaseStatusHistoryService, LeaseStatusHistoryRepository],
  exports: [LeaseStatusHistoryService, LeaseStatusHistoryRepository],
})
export class LeaseStatusHistoryModule {}
