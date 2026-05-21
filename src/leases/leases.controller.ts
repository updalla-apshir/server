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
import { LeasesService } from './leases.service';
import type { PaginationOptions } from 'src/shared/types/common';
import { createLeaseSchema, updateLeaseSchema } from './dto/create-lease.dto';
import type { CreateLeaseDto, UpdateLeaseDto } from './dto/create-lease.dto';
import { ZodValidationPipe } from 'src/core/pipes/zod-validation.pipe';
import { Roles } from 'src/core/common/roles.decorator';

@Roles('admin', 'manager', 'accountant')
@Controller('leases')
export class LeasesController {
  constructor(private readonly leasesService: LeasesService) {}

  @Post()
  create(@Body(new ZodValidationPipe(createLeaseSchema)) data: CreateLeaseDto) {
    return this.leasesService.create(data);
  }

  @Get()
  findAll(@Query() pagination: PaginationOptions) {
    return this.leasesService.findAll(pagination);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.leasesService.findOne(+id);
  }

  @Get('tenant/:tenantId')
  findByTenant(@Param('tenantId') tenantId: string) {
    return this.leasesService.findByTenant(+tenantId);
  }

  @Get('unit/:unitId')
  findByUnit(@Param('unitId') unitId: string) {
    return this.leasesService.findByUnit(+unitId);
  }

  @Get('status/active')
  findActive() {
    return this.leasesService.findActive();
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(updateLeaseSchema)) data: UpdateLeaseDto,
  ) {
    return this.leasesService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.leasesService.delete(+id);
  }
}
