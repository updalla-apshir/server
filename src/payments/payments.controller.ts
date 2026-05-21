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
import { PaymentsService } from './payments.service';
import type { PaginationOptions } from 'src/shared/types/common';
import {
  createPaymentSchema,
  updatePaymentSchema,
} from './dto/create-payment.dto';
import type {
  CreatePaymentDto,
  UpdatePaymentDto,
} from './dto/create-payment.dto';
import { ZodValidationPipe } from '../core/pipes/zod-validation.pipe';
import { Roles } from '../core/common/roles.decorator';

@Roles('admin', 'accountant')
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post()
  create(@Body(new ZodValidationPipe(createPaymentSchema)) data: CreatePaymentDto) {
    return this.paymentsService.create(data);
  }

  @Get()
  findAll(@Query() pagination: PaginationOptions) {
    return this.paymentsService.findAll(pagination);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paymentsService.findOne(+id);
  }

  @Get('tenant/:tenantId')
  findByTenant(@Param('tenantId') tenantId: string) {
    return this.paymentsService.findByTenant(+tenantId);
  }

  @Get('account/:accountId')
  findByAccount(@Param('accountId') accountId: string) {
    return this.paymentsService.findByAccount(+accountId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body(new ZodValidationPipe(updatePaymentSchema)) data: UpdatePaymentDto) {
    return this.paymentsService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentsService.delete(+id);
  }
}
