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
import { PaymentAllocationsService } from './payment-allocations.service';
import type { PaginationOptions } from '../shared/types/common';
import {
  createPaymentAllocationSchema,
  updatePaymentAllocationSchema,
} from './dto/create-payment-allocation.dto';
import type {
  CreatePaymentAllocationDto,
  UpdatePaymentAllocationDto,
} from './dto/create-payment-allocation.dto';
import { ZodValidationPipe } from '../core/pipes/zod-validation.pipe';
import { Roles } from '../core/common/roles.decorator';

@Roles('admin', 'accountant')
@Controller('payment-allocations')
export class PaymentAllocationsController {
  constructor(
    private readonly paymentAllocationsService: PaymentAllocationsService,
  ) {}

  @Post()
  create(@Body(new ZodValidationPipe(createPaymentAllocationSchema)) data: CreatePaymentAllocationDto) {
    return this.paymentAllocationsService.create(data);
  }

  @Get()
  findAll(@Query() pagination: PaginationOptions) {
    return this.paymentAllocationsService.findAll(pagination);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paymentAllocationsService.findOne(+id);
  }

  @Get('payment/:paymentId')
  findByPayment(@Param('paymentId') paymentId: string) {
    return this.paymentAllocationsService.findByPayment(+paymentId);
  }

  @Get('invoice/:invoiceId')
  findByInvoice(@Param('invoiceId') invoiceId: string) {
    return this.paymentAllocationsService.findByInvoice(+invoiceId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body(new ZodValidationPipe(updatePaymentAllocationSchema)) data: UpdatePaymentAllocationDto) {
    return this.paymentAllocationsService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentAllocationsService.delete(+id);
  }
}
