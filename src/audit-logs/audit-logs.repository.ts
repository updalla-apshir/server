import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../core/common/base.repository';
import { PrismaService } from '../core/database/prisma.service';
import { AuditLog } from '../../generated/prisma';

@Injectable()
export class AuditLogsRepository extends BaseRepository<AuditLog> {
  constructor(prisma: PrismaService) {
    super(prisma, 'auditLog');
  }

  async findAll(
    options: {
      skip?: number;
      take?: number;
      where?: any;
      orderBy?: any;
      include?: any;
    } = {},
  ): Promise<AuditLog[]> {
    return super.findAll({
      ...options,
      include: { ...options.include, user: true },
    });
  }

  async findByUser(userId: number): Promise<AuditLog[]> {
    return this.prisma.auditLog.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      include: {
        user: true,
      },
    });
  }

  async findByAction(action: string): Promise<AuditLog[]> {
    return this.prisma.auditLog.findMany({
      where: { action },
      orderBy: { createdAt: 'desc' },
      include: {
        user: true,
      },
    });
  }

  async findByTable(tableName: string): Promise<AuditLog[]> {
    return this.prisma.auditLog.findMany({
      where: { tableName },
      orderBy: { createdAt: 'desc' },
      include: {
        user: true,
      },
    });
  }

  async findByRecord(tableName: string, recordId: number): Promise<AuditLog[]> {
    return this.prisma.auditLog.findMany({
      where: {
        tableName,
        recordId,
      },
      orderBy: { createdAt: 'desc' },
      include: {
        user: true,
      },
    });
  }

  async findRecentActions(limit: number = 50): Promise<AuditLog[]> {
    return this.prisma.auditLog.findMany({
      orderBy: { createdAt: 'desc' },
      take: limit,
      include: {
        user: true,
      },
    });
  }
}
