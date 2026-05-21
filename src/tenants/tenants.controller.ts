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
import { TenantsService } from './tenants.service';
import type { PaginationOptions } from 'src/shared/types/common';
import {
  createTenantSchema,
  updateTenantSchema,
} from './dto/create-tenant.dto';
import type { CreateTenantDto, UpdateTenantDto } from './dto/create-tenant.dto';
import { ZodValidationPipe } from '../core/pipes/zod-validation.pipe';
import { Roles } from '../core/common/roles.decorator';

@Roles('admin', 'manager')
@Controller('tenants')
export class TenantsController {
  constructor(private readonly tenantsService: TenantsService) {}

  @Post()
  create(@Body(new ZodValidationPipe(createTenantSchema)) data: CreateTenantDto) {
    return this.tenantsService.create(data);
  }

  @Get()
  findAll(@Query() pagination: PaginationOptions) {
    return this.tenantsService.findAll(pagination);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tenantsService.findOne(+id);
  }

  @Get('debts')
  getDebtOverview() {
    return this.tenantsService.getDebtOverview();
  }

  @Get(':id/debt')
  getTenantDebt(@Param('id') id: string) {
    return this.tenantsService.getTenantDebt(+id);
  }

  @Get('phone/:phone')
  findByPhone(@Param('phone') phone: string) {
    return this.tenantsService.findByPhone(phone);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body(new ZodValidationPipe(updateTenantSchema)) data: UpdateTenantDto) {
    return this.tenantsService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tenantsService.delete(+id);
  }
}
