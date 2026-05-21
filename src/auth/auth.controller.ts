import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from 'src/core/guards/local-auth.guard';
import { ZodValidationPipe } from 'src/core/pipes/zod-validation.pipe';
import { loginSchema } from './dto/login.dto';
import type { LoginDto } from './dto/login.dto';
import { registerSchema } from './dto/register.dto';
import type { RegisterDto } from './dto/register.dto';
import { Public } from 'src/core/common/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Request() req,
    @Body(new ZodValidationPipe(loginSchema)) _data: LoginDto,
  ) {
    return this.authService.login(req.user);
  }

  @Public()
  @Post('register')
  async register(
    @Body(new ZodValidationPipe(registerSchema)) data: RegisterDto,
  ) {
    return this.authService.register(data);
  }
}
