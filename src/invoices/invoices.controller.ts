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
import { InvoicesService } from './invoices.service';
import type { PaginationOptions } from 'src/shared/types/common';
import {
  createInvoiceSchema,
  updateInvoiceSchema,
} from './dto/create-invoice.dto';
import type {
  CreateInvoiceDto,
  UpdateInvoiceDto,
} from './dto/create-invoice.dto';
import { ZodValidationPipe } from '../core/pipes/zod-validation.pipe';
import { Roles } from '../core/common/roles.decorator';

@Roles('admin', 'accountant')
@Controller('invoices')
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) {}

  @Post()
  create(@Body(new ZodValidationPipe(createInvoiceSchema)) data: CreateInvoiceDto) {
    return this.invoicesService.create(data);
  }

  @Get()
  findAll(@Query() pagination: PaginationOptions) {
    return this.invoicesService.findAll(pagination);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.invoicesService.findOne(+id);
  }

  @Get('lease/:leaseId')
  findByLease(@Param('leaseId') leaseId: string) {
    return this.invoicesService.findByLease(+leaseId);
  }

  @Get('status/:status')
  findByStatus(@Param('status') status: string) {
    return this.invoicesService.findByStatus(status);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body(new ZodValidationPipe(updateInvoiceSchema)) data: UpdateInvoiceDto) {
    return this.invoicesService.update(+id, data);
  }

  @Post('mark-overdue')
  markOverdue() {
    return this.invoicesService.markOverdue();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.invoicesService.delete(+id);
  }
}
