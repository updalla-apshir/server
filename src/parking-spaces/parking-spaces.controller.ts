import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ParkingSpacesService } from './parking-spaces.service';
import type { PaginationOptions } from '../shared/types/common';
import {
  createParkingSpaceSchema,
  updateParkingSpaceSchema,
} from './dto/create-parking-space.dto';
import type {
  CreateParkingSpaceDto,
  UpdateParkingSpaceDto,
} from './dto/create-parking-space.dto';
import { ZodValidationPipe } from '../core/pipes/zod-validation.pipe';
import { Roles } from '../core/common/roles.decorator';

@Roles('admin', 'manager')
@Controller('parking-spaces')
export class ParkingSpacesController {
  constructor(private readonly parkingSpacesService: ParkingSpacesService) {}

  @Post()
  create(@Body(new ZodValidationPipe(createParkingSpaceSchema)) data: CreateParkingSpaceDto) {
    return this.parkingSpacesService.create(data);
  }

  @Get()
  findAll(@Query() pagination: PaginationOptions) {
    return this.parkingSpacesService.findAll(pagination);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.parkingSpacesService.findOne(+id);
  }

  @Get('building/:buildingId')
  findByBuilding(@Param('buildingId') buildingId: string) {
    return this.parkingSpacesService.findByBuilding(+buildingId);
  }

  @Get('status/:status')
  findByStatus(@Param('status') status: string) {
    return this.parkingSpacesService.findByStatus(status);
  }

  @Get('available')
  findAvailable() {
    return this.parkingSpacesService.findAvailable();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body(new ZodValidationPipe(updateParkingSpaceSchema)) data: UpdateParkingSpaceDto) {
    return this.parkingSpacesService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.parkingSpacesService.delete(+id);
  }
}
