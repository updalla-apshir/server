import { Module } from '@nestjs/common';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { DatabaseModule } from './core/database/database.module';
import { LoggerModule } from './core/logger/logger.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PropertiesModule } from './properties/properties.module';
import { BuildingsModule } from './buildings/buildings.module';
import { UnitsModule } from './units/units.module';
import { TenantsModule } from './tenants/tenants.module';
import { TenantContactsModule } from './tenant-contacts/tenant-contacts.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { ServiceChargesModule } from './service-charges/service-charges.module';
import { ParkingSpacesModule } from './parking-spaces/parking-spaces.module';
import { LeasesModule } from './leases/leases.module';
import { InvoicesModule } from './invoices/invoices.module';
import { InvoiceItemsModule } from './invoice-items/invoice-items.module';
import { PaymentsModule } from './payments/payments.module';
import { PaymentAllocationsModule } from './payment-allocations/payment-allocations.module';
import { AccountsModule } from './accounts/accounts.module';
import { ReceiptsModule } from './receipts/receipts.module';
import { AuditLogsModule } from './audit-logs/audit-logs.module';
import { LeaseStatusHistoryModule } from './lease-status-history/lease-status-history.module';
import { AuditLogInterceptor } from './core/interceptors/audit-log.interceptor';
import { JwtAuthGuard } from './core/guards/jwt-auth.guard';
import { RolesGuard } from './core/guards/roles.guard';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    DatabaseModule,
    LoggerModule,
    AuthModule,
    UsersModule,
    PropertiesModule,
    BuildingsModule,
    UnitsModule,
    TenantsModule,
    TenantContactsModule,
    ServiceChargesModule,
    DashboardModule,
    ParkingSpacesModule,
    LeasesModule,
    InvoicesModule,
    InvoiceItemsModule,
    PaymentsModule,
    PaymentAllocationsModule,
    AccountsModule,
    ReceiptsModule,
    AuditLogsModule,
    LeaseStatusHistoryModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: AuditLogInterceptor,
    },
  ],
})
export class AppModule {}
