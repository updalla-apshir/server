import { Module } from '@nestjs/common';
import { DatabaseModule } from '../core/database/database.module';
import { BuildingsController } from './buildings.controller';
import { BuildingsService } from './buildings.service';
import { BuildingsRepository } from './buildings.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [BuildingsController],
  providers: [BuildingsService, BuildingsRepository],
  exports: [BuildingsService, BuildingsRepository],
})
export class BuildingsModule {}
