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
import { AccountsService } from './accounts.service';
import type { PaginationOptions } from 'src/shared/types/common';
import {
  createAccountSchema,
  updateAccountSchema,
} from './dto/create-account.dto';
import type {
  CreateAccountDto,
  UpdateAccountDto,
} from './dto/create-account.dto';
import { ZodValidationPipe } from '../core/pipes/zod-validation.pipe';
import { Roles } from '../core/common/roles.decorator';

@Roles('admin', 'accountant')
@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Post()
  create(@Body(new ZodValidationPipe(createAccountSchema)) data: CreateAccountDto) {
    return this.accountsService.create(data);
  }

  @Get()
  findAll(@Query() pagination: PaginationOptions) {
    return this.accountsService.findAll(pagination);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.accountsService.findOne(+id);
  }

  @Get('type/:type')
  findByType(@Param('type') type: string) {
    return this.accountsService.findByType(type);
  }

  @Get('status/:status')
  findByStatus(@Param('status') status: string) {
    return this.accountsService.findByStatus(status);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body(new ZodValidationPipe(updateAccountSchema)) data: UpdateAccountDto) {
    return this.accountsService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.accountsService.delete(+id);
  }
}
