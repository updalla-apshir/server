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
import { ReceiptsService } from './receipts.service';
import type { PaginationOptions } from '../shared/types/common';
import {
  createReceiptSchema,
  updateReceiptSchema,
} from './dto/create-receipt.dto';
import type {
  CreateReceiptDto,
  UpdateReceiptDto,
} from './dto/create-receipt.dto';
import { ZodValidationPipe } from '../core/pipes/zod-validation.pipe';
import { Roles } from '../core/common/roles.decorator';

@Roles('admin', 'accountant')
@Controller('receipts')
export class ReceiptsController {
  constructor(private readonly receiptsService: ReceiptsService) {}

  @Post()
  create(@Body(new ZodValidationPipe(createReceiptSchema)) data: CreateReceiptDto) {
    return this.receiptsService.create(data);
  }

  @Get()
  findAll(@Query() pagination: PaginationOptions) {
    return this.receiptsService.findAll(pagination);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.receiptsService.findOne(+id);
  }

  @Get('payment/:paymentId')
  findByPayment(@Param('paymentId') paymentId: string) {
    return this.receiptsService.findByPayment(+paymentId);
  }

  @Get('number/:receiptNumber')
  findByNumber(@Param('receiptNumber') receiptNumber: string) {
    return this.receiptsService.findByNumber(receiptNumber);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body(new ZodValidationPipe(updateReceiptSchema)) data: UpdateReceiptDto) {
    return this.receiptsService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.receiptsService.delete(+id);
  }
}
