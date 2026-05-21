import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { User } from '../../generated/prisma';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      return { error: 'Invalid credentials' };
    }
    if (user.status !== 'active') {
      return { error: 'You are not able to log in' };
    }
    if (await bcrypt.compare(password, user.passwordHash)) {
      const { passwordHash, ...result } = user;
      return result;
    }
    return { error: 'Invalid credentials' };
  }

  async login(user: User) {
    // Update last login
    await this.usersService.updateLastLogin(user.id);

    const payload = { email: user.email, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }

  async register(data: { name: string; email: string; password: string }) {
    const user = await this.usersService.create({
      name: data.name,
      email: data.email,
      password: data.password,
      role: 'manager', // default role
      status: 'active',
    });
    // Optionally login immediately
    return this.login(user);
  }
}
