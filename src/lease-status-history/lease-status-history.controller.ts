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
import { LeaseStatusHistoryService } from './lease-status-history.service';
import type { PaginationOptions } from 'src/shared/types/common';
import {
  createLeaseStatusHistorySchema,
  updateLeaseStatusHistorySchema,
} from './dto/create-lease-status-history.dto';
import type {
  CreateLeaseStatusHistoryDto,
  UpdateLeaseStatusHistoryDto,
} from './dto/create-lease-status-history.dto';
import { ZodValidationPipe } from '../core/pipes/zod-validation.pipe';
import { Roles } from '../core/common/roles.decorator';

@Roles('admin', 'manager', 'accountant')
@Controller('lease-status-history')
export class LeaseStatusHistoryController {
  constructor(
    private readonly leaseStatusHistoryService: LeaseStatusHistoryService,
  ) {}

  @Post()
  create(@Body(new ZodValidationPipe(createLeaseStatusHistorySchema)) data: CreateLeaseStatusHistoryDto) {
    return this.leaseStatusHistoryService.create(data);
  }

  @Get()
  findAll(@Query() pagination: PaginationOptions) {
    return this.leaseStatusHistoryService.findAll(pagination);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.leaseStatusHistoryService.findOne(+id);
  }

  @Get('lease/:leaseId')
  findByLease(@Param('leaseId') leaseId: string) {
    return this.leaseStatusHistoryService.findByLease(+leaseId);
  }

  @Get('changed-by/:userId')
  findByChangedBy(@Param('userId') userId: string) {
    return this.leaseStatusHistoryService.findByChangedBy(+userId);
  }

  @Get('status/:status')
  findByStatus(@Param('status') status: string) {
    return this.leaseStatusHistoryService.findByStatus(status);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body(new ZodValidationPipe(updateLeaseStatusHistorySchema)) data: UpdateLeaseStatusHistoryDto) {
    return this.leaseStatusHistoryService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.leaseStatusHistoryService.delete(+id);
  }
}
