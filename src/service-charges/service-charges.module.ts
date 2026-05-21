import { Module } from '@nestjs/common';
import { DatabaseModule } from '../core/database/database.module';
import { ServiceChargesController } from './service-charges.controller';
import { ServiceChargesService } from './service-charges.service';
import { ServiceChargesRepository } from './service-charges.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [ServiceChargesController],
  providers: [ServiceChargesService, ServiceChargesRepository],
  exports: [ServiceChargesService, ServiceChargesRepository],
})
export class ServiceChargesModule {}
