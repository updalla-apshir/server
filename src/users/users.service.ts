import { Injectable, ConflictException, BadRequestException } from '@nestjs/common';
import { BaseService } from '../core/common/base.service';
import { UsersRepository } from './users.repository';
import { User } from '../../generated/prisma';
import type { CreateUserDto } from './dto/create-user.dto';
import type { UpdateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService extends BaseService<User> {
  constructor(private usersRepository: UsersRepository) {
    super(usersRepository);
  }

  async create(data: CreateUserDto): Promise<User> {
    // Validate that password is provided (double-check DTO validation)
    if (!data.password || typeof data.password !== 'string' || data.password.trim() === '') {
      throw new BadRequestException('Password is required for user creation');
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // Check if user already exists
    const existingUser = await this.usersRepository.findByEmail(data.email);
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    // Create user with hashed password
    return this.usersRepository.create({
      name: data.name,
      email: data.email,
      passwordHash: hashedPassword,
      role: data.role,
      status: data.status,
    });
  }

  async update(id: number, data: UpdateUserDto): Promise<User> {
    const updateData: any = { ...data };
    if (updateData.password) {
      updateData.passwordHash = await bcrypt.hash(updateData.password, 10);
    }
    delete updateData.password;
    return super.update(id, updateData);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findByEmail(email);
  }

  async findByRole(role: string): Promise<User[]> {
    return this.usersRepository.findByRole(role);
  }

  async updateLastLogin(id: number): Promise<User> {
    return this.usersRepository.update(id, { lastLoginAt: new Date() });
  }
}