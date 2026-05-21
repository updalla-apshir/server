import { Controller, Get, Query } from '@nestjs/common';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('stats')
  getStats() {
    return this.dashboardService.getStats();
  }

  @Get('revenue')
  getMonthlyRevenue() {
    return this.dashboardService.getMonthlyRevenue();
  }

  @Get('recent-payments')
  getRecentPayments(@Query('limit') limit?: number) {
    return this.dashboardService.getRecentPayments(limit ? Number(limit) : 10);
  }

  @Get('recent-activity')
  getRecentActivity(@Query('limit') limit?: number) {
    return this.dashboardService.getRecentActivity(limit ? Number(limit) : 10);
  }

  @Get('expiring-leases')
  getExpiringLeases(@Query('days') days?: number) {
    return this.dashboardService.getExpiringLeases(days ? Number(days) : 30);
  }

  @Get('invoice-status')
  getInvoiceStatusBreakdown() {
    return this.dashboardService.getInvoiceStatusBreakdown();
  }
}
