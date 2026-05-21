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
import { UsersService } from './users.service';
import type { PaginationOptions } from '../shared/types/common';
import { createUserSchema, updateUserSchema } from './dto/create-user.dto';
import type { CreateUserDto, UpdateUserDto } from './dto/create-user.dto';
import { ZodValidationPipe } from '../core/pipes/zod-validation.pipe';
import { Roles } from '../core/common/roles.decorator';

@Roles('admin')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body(new ZodValidationPipe(createUserSchema)) data: CreateUserDto) {
    return this.usersService.create(data);
  }

  @Get()
  findAll(@Query() pagination: PaginationOptions) {
    return this.usersService.findAll(pagination);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body(new ZodValidationPipe(updateUserSchema)) data: UpdateUserDto) {
    return this.usersService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.delete(+id);
  }

  @Get('role/:role')
  findByRole(@Param('role') role: string) {
    return this.usersService.findByRole(role);
  }
}
