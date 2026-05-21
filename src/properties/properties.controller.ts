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
import { PropertiesService } from './properties.service';
import type { PaginationOptions } from '../shared/types/common';
import {
  createPropertySchema,
  updatePropertySchema,
} from './dto/create-property.dto';
import type {
  CreatePropertyDto,
  UpdatePropertyDto,
} from './dto/create-property.dto';
import { ZodValidationPipe } from '../core/pipes/zod-validation.pipe';
import { Roles } from '../core/common/roles.decorator';

@Roles('admin', 'manager')
@Controller('properties')
export class PropertiesController {
  constructor(private readonly propertiesService: PropertiesService) {}

  @Post()
  create(@Body(new ZodValidationPipe(createPropertySchema)) data: CreatePropertyDto) {
    return this.propertiesService.create(data);
  }

  @Get()
  findAll(@Query() pagination: PaginationOptions) {
    // Sort by createdAt ascending by default (oldest first, consistent order)
    const sort = { field: 'createdAt', order: 'asc' };
    return this.propertiesService.findAll(pagination, sort);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.propertiesService.findOne(+id);
  }

  @Get(':id/buildings')
  findWithBuildings(@Param('id') id: string) {
    return this.propertiesService.findWithBuildings(+id);
  }

  @Get('city/:city')
  findByCity(@Param('city') city: string) {
    return this.propertiesService.findByCity(city);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body(new ZodValidationPipe(updatePropertySchema)) data: UpdatePropertyDto) {
    return this.propertiesService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.propertiesService.delete(+id);
  }
}
