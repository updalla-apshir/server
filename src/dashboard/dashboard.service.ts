import { Injectable } from '@nestjs/common';
import { PrismaService } from '../core/database/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) {}

  async getStats() {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const [
      pendingInvoices,
      monthlyRevenue,
      activeLeases,
      totalUnits,
      occupiedUnits,
      totalOutstanding,
      overdueInvoices,
      totalProperties,
      totalBuildings,
      totalTenants,
    ] = await Promise.all([
      this.prisma.invoice.count({ where: { status: 'pending' } }),
      this.prisma.payment.aggregate({
        where: { paymentDate: { gte: startOfMonth } },
        _sum: { amount: true },
      }),
      this.prisma.lease.count({ where: { status: 'active' } }),
      this.prisma.unit.count(),
      this.prisma.unit.count({ where: { status: 'occupied' } }),
      this.prisma.invoice.aggregate({
        where: { status: { in: ['pending', 'overdue'] } },
        _sum: { balanceAmount: true },
      }),
      this.prisma.invoice.count({ where: { status: 'overdue' } }),
      this.prisma.property.count(),
      this.prisma.building.count(),
      this.prisma.tenant.count(),
    ]);

    return {
      properties: totalProperties,
      buildings: totalBuildings,
      units: totalUnits,
      tenants: totalTenants,
      activeLeases,
      pendingInvoices,
      overdueInvoices,
      monthlyRevenue: monthlyRevenue._sum.amount?.toNumber() || 0,
      totalOutstanding: totalOutstanding._sum.balanceAmount?.toNumber() || 0,
      occupancyRate: totalUnits > 0 ? Math.round((occupiedUnits / totalUnits) * 100) : 0,
    };
  }

  async getMonthlyRevenue() {
    const now = new Date();
    const twelveMonthsAgo = new Date(now.getFullYear() - 1, now.getMonth(), 1);

    const months: { month: string; revenue: number; unpaid: number }[] = [];

    for (let i = 11; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthStart = new Date(d.getFullYear(), d.getMonth(), 1);
      const monthEnd = new Date(d.getFullYear(), d.getMonth() + 1, 1);
      const monthLabel = d.toLocaleString('default', { month: 'short' });

      const [paidResult, unpaidResult] = await Promise.all([
        this.prisma.payment.aggregate({
          where: { paymentDate: { gte: monthStart, lt: monthEnd } },
          _sum: { amount: true },
        }),
        this.prisma.invoice.aggregate({
          where: {
            issueDate: { gte: monthStart, lt: monthEnd },
            status: { in: ['pending', 'overdue'] },
          },
          _sum: { balanceAmount: true },
        }),
      ]);

      months.push({
        month: monthLabel,
        revenue: paidResult._sum.amount?.toNumber() || 0,
        unpaid: unpaidResult._sum.balanceAmount?.toNumber() || 0,
      });
    }

    return months;
  }

  async getRecentPayments(limit = 10) {
    return this.prisma.payment.findMany({
      take: limit,
      orderBy: { paymentDate: 'desc' },
      include: {
        tenant: { select: { id: true, name: true } },
        account: { select: { id: true, name: true } },
        allocations: {
          include: { invoice: { select: { id: true, invoiceNumber: true } } },
        },
      },
    });
  }

  async getRecentActivity(limit = 10) {
    return this.prisma.auditLog.findMany({
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: { user: { select: { id: true, name: true } } },
    });
  }

  async getExpiringLeases(days = 30) {
    const now = new Date();
    const future = new Date();
    future.setDate(future.getDate() + days);

    return this.prisma.lease.findMany({
      where: {
        status: 'active',
        endDate: { gte: now, lte: future },
      },
      include: {
        tenant: { select: { id: true, name: true } },
        unit: {
          select: { id: true, unitNumber: true, building: { select: { name: true } } },
        },
      },
      orderBy: { endDate: 'asc' },
    });
  }

  async getInvoiceStatusBreakdown() {
    const [pending, paid, overdue] = await Promise.all([
      this.prisma.invoice.count({ where: { status: 'pending' } }),
      this.prisma.invoice.count({ where: { status: 'paid' } }),
      this.prisma.invoice.count({ where: { status: 'overdue' } }),
    ]);

    return { pending, paid, overdue };
  }
}
