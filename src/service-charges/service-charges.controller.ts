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
import { ServiceChargesService } from './service-charges.service';
import type { PaginationOptions } from 'src/shared/types/common';
import {
  createServiceChargeSchema,
  updateServiceChargeSchema,
} from './dto/create-service-charge.dto';
import type {
  CreateServiceChargeDto,
  UpdateServiceChargeDto,
} from './dto/create-service-charge.dto';
import { ZodValidationPipe } from '../core/pipes/zod-validation.pipe';
import { Roles } from '../core/common/roles.decorator';

@Roles('admin', 'manager')
@Controller('service-charges')
export class ServiceChargesController {
  constructor(private readonly serviceChargesService: ServiceChargesService) {}

  @Post()
  create(@Body(new ZodValidationPipe(createServiceChargeSchema)) data: CreateServiceChargeDto) {
    return this.serviceChargesService.create(data);
  }

  @Get()
  findAll(@Query() pagination: PaginationOptions) {
    return this.serviceChargesService.findAll(pagination);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.serviceChargesService.findOne(+id);
  }

  @Get('building/:buildingId')
  findByBuilding(@Param('buildingId') buildingId: string) {
    return this.serviceChargesService.findByBuilding(+buildingId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body(new ZodValidationPipe(updateServiceChargeSchema)) data: UpdateServiceChargeDto) {
    return this.serviceChargesService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.serviceChargesService.delete(+id);
  }
}
