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
import { AuditLogsService } from './audit-logs.service';
import type { PaginationOptions } from '../shared/types/common';
import {
  createAuditLogSchema,
  updateAuditLogSchema,
} from './dto/create-audit-log.dto';
import type {
  CreateAuditLogDto,
  UpdateAuditLogDto,
} from './dto/create-audit-log.dto';
import { ZodValidationPipe } from '../core/pipes/zod-validation.pipe';
import { Roles } from '../core/common/roles.decorator';

@Roles('admin')
@Controller('audit-logs')
export class AuditLogsController {
  constructor(private readonly auditLogsService: AuditLogsService) {}

  @Post()
  create(@Body(new ZodValidationPipe(createAuditLogSchema)) data: CreateAuditLogDto) {
    return this.auditLogsService.create(data);
  }

  @Get()
  findAll(@Query() pagination: PaginationOptions) {
    return this.auditLogsService.findAll(pagination);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.auditLogsService.findOne(+id);
  }

  @Get('user/:userId')
  findByUser(@Param('userId') userId: string) {
    return this.auditLogsService.findByUser(+userId);
  }

  @Get('action/:action')
  findByAction(@Param('action') action: string) {
    return this.auditLogsService.findByAction(action);
  }

  @Get('table/:tableName')
  findByTable(@Param('tableName') tableName: string) {
    return this.auditLogsService.findByTable(tableName);
  }

  @Get('record/:tableName/:recordId')
  findByRecord(
    @Param('tableName') tableName: string,
    @Param('recordId') recordId: string,
  ) {
    return this.auditLogsService.findByRecord(tableName, +recordId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body(new ZodValidationPipe(updateAuditLogSchema)) data: UpdateAuditLogDto) {
    return this.auditLogsService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.auditLogsService.delete(+id);
  }
}
