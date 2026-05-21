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
import { InvoiceItemsService } from './invoice-items.service';
import type { PaginationOptions } from 'src/shared/types/common';
import {
  createInvoiceItemSchema,
  updateInvoiceItemSchema,
} from './dto/create-invoice-item.dto';
import type {
  CreateInvoiceItemDto,
  UpdateInvoiceItemDto,
} from './dto/create-invoice-item.dto';
import { Roles } from '../core/common/roles.decorator';

@Roles('admin', 'accountant')
@Controller('invoice-items')
export class InvoiceItemsController {
  constructor(private readonly invoiceItemsService: InvoiceItemsService) {}

  @Post()
  create(@Body() data: CreateInvoiceItemDto) {
    return this.invoiceItemsService.create(data);
  }

  @Get()
  findAll(@Query() pagination: PaginationOptions) {
    return this.invoiceItemsService.findAll(pagination);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.invoiceItemsService.findOne(+id);
  }

  @Get('invoice/:invoiceId')
  findByInvoice(@Param('invoiceId') invoiceId: string) {
    return this.invoiceItemsService.findByInvoice(+invoiceId);
  }

  @Get('type/:type')
  findByType(@Param('type') type: string) {
    return this.invoiceItemsService.findByType(type);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdateInvoiceItemDto) {
    return this.invoiceItemsService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.invoiceItemsService.delete(+id);
  }
}
