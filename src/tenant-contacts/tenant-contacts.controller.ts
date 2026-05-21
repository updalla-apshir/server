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
import { TenantContactsService } from './tenant-contacts.service';
import type { PaginationOptions } from '../shared/types/common';
import {
  createTenantContactSchema,
  updateTenantContactSchema,
} from './dto/create-tenant-contact.dto';
import type {
  CreateTenantContactDto,
  UpdateTenantContactDto,
} from './dto/create-tenant-contact.dto';
import { ZodValidationPipe } from '../core/pipes/zod-validation.pipe';
import { Roles } from '../core/common/roles.decorator';

@Roles('admin', 'manager')
@Controller('tenant-contacts')
export class TenantContactsController {
  constructor(private readonly tenantContactsService: TenantContactsService) {}

  @Post()
  create(@Body(new ZodValidationPipe(createTenantContactSchema)) data: CreateTenantContactDto) {
    return this.tenantContactsService.create(data);
  }

  @Get()
  findAll(@Query() pagination: PaginationOptions) {
    return this.tenantContactsService.findAll(pagination);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tenantContactsService.findOne(+id);
  }

  @Get('tenant/:tenantId')
  findByTenant(@Param('tenantId') tenantId: string) {
    return this.tenantContactsService.findByTenant(+tenantId);
  }

  @Get('role/:role')
  findByRole(@Param('role') role: string) {
    return this.tenantContactsService.findByRole(role);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body(new ZodValidationPipe(updateTenantContactSchema)) data: UpdateTenantContactDto) {
    return this.tenantContactsService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tenantContactsService.delete(+id);
  }
}
