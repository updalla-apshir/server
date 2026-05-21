import { Module } from '@nestjs/common';
import { DatabaseModule } from '../core/database/database.module';
import { ParkingSpacesController } from './parking-spaces.controller';
import { ParkingSpacesService } from './parking-spaces.service';
import { ParkingSpacesRepository } from './parking-spaces.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [ParkingSpacesController],
  providers: [ParkingSpacesService, ParkingSpacesRepository],
  exports: [ParkingSpacesService, ParkingSpacesRepository],
})
export class ParkingSpacesModule {}
