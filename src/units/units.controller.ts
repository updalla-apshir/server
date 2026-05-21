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
import { UnitsService } from './units.service';
import type { PaginationOptions } from '../shared/types/common';
import { createUnitSchema, updateUnitSchema } from './dto/create-unit.dto';
import type { CreateUnitDto, UpdateUnitDto } from './dto/create-unit.dto';
import { ZodValidationPipe } from '../core/pipes/zod-validation.pipe';
import { Roles } from '../core/common/roles.decorator';

@Roles('admin', 'manager')
@Controller('units')
export class UnitsController {
  constructor(private readonly unitsService: UnitsService) {}

  @Post()
  create(@Body(new ZodValidationPipe(createUnitSchema)) data: CreateUnitDto) {
    console.log('Creating unit with data:', data);
    return this.unitsService.create(data);
  }

  @Get()
  findAll(@Query() pagination: PaginationOptions) {
    return this.unitsService.findAll(pagination);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.unitsService.findOne(+id);
  }

  @Get('building/:buildingId')
  findByBuilding(@Param('buildingId') buildingId: string) {
    return this.unitsService.findByBuilding(+buildingId);
  }

  @Get('status/available')
  findAvailable() {
    return this.unitsService.findAvailable();
  }

  @Get('status/:status')
  findByStatus(@Param('status') status: string) {
    return this.unitsService.findByStatus(status);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body(new ZodValidationPipe(updateUnitSchema)) data: UpdateUnitDto) {
    return this.unitsService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.unitsService.delete(+id);
  }
}
