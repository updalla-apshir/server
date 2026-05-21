import { Module } from '@nestjs/common';
import { DatabaseModule } from '../core/database/database.module';
import { UnitsController } from './units.controller';
import { UnitsService } from './units.service';
import { UnitsRepository } from './units.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [UnitsController],
  providers: [UnitsService, UnitsRepository],
  exports: [UnitsService, UnitsRepository],
})
export class UnitsModule {}
