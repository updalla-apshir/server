import {
  Controller,
  Get,
  Patch,
  Body,
  Request,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ZodValidationPipe } from '../core/pipes/zod-validation.pipe';
import { updateUserSchema } from './dto/create-user.dto';
import { changePasswordSchema } from './dto/change-password.dto';
import * as bcrypt from 'bcrypt';

@Controller('profile')
export class ProfileController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getProfile(@Request() req: any) {
    return this.usersService.findOne(req.user.id);
  }

  @Patch()
  async updateProfile(
    @Request() req: any,
    @Body(new ZodValidationPipe(updateUserSchema)) data: any,
  ) {
    try {
      return await this.usersService.update(req.user.id, data);
    } catch (err: any) {
      if (err.code === 'P2002') {
        throw new ConflictException('Email already in use');
      }
      throw err;
    }
  }

  @Patch('password')
  async changePassword(
    @Request() req: any,
    @Body(new ZodValidationPipe(changePasswordSchema)) data: any,
  ) {
    const user = await this.usersService.findOne(req.user.id);
    const isMatch = await bcrypt.compare(data.current_password, user.passwordHash);
    if (!isMatch) {
      throw new BadRequestException('Current password is incorrect');
    }
    return this.usersService.update(req.user.id, { password: data.new_password });
  }
}
