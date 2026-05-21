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
import { BuildingsService } from './buildings.service';
import type { PaginationOptions } from '../shared/types/common';
import {
  createBuildingSchema,
  updateBuildingSchema,
} from './dto/create-building.dto';
import type {
  CreateBuildingDto,
  UpdateBuildingDto,
} from './dto/create-building.dto';
import { ZodValidationPipe } from '../core/pipes/zod-validation.pipe';
import { Roles } from '../core/common/roles.decorator';

@Roles('admin', 'manager')
@Controller('buildings')
export class BuildingsController {
  constructor(private readonly buildingsService: BuildingsService) {}

  @Post()
  create(@Body(new ZodValidationPipe(createBuildingSchema)) data: CreateBuildingDto) {
    return this.buildingsService.create(data);
  }

  @Get()
  findAll(@Query() pagination: PaginationOptions) {
    return this.buildingsService.findAll(pagination);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.buildingsService.findOne(+id);
  }

  @Get('property/:propertyId')
  findByProperty(@Param('propertyId') propertyId: string) {
    return this.buildingsService.findByProperty(+propertyId);
  }

  @Get('type/:type')
  findByType(@Param('type') type: string) {
    return this.buildingsService.findByType(type);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body(new ZodValidationPipe(updateBuildingSchema)) data: UpdateBuildingDto) {
    return this.buildingsService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.buildingsService.delete(+id);
  }
}
