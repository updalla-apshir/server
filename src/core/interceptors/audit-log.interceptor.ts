import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, from, forkJoin } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { PrismaService } from '../database/prisma.service';
import { AuditLogsService } from '../../audit-logs/audit-logs.service';

const ROUTE_TO_MODEL: Record<string, string> = {
  'users': 'user',
  'properties': 'property',
  'buildings': 'building',
  'units': 'unit',
  'tenants': 'tenant',
  'tenant-contacts': 'tenantContact',
  'service-charges': 'serviceCharge',
  'parking-spaces': 'parkingSpace',
  'leases': 'lease',
  'invoices': 'invoice',
  'invoice-items': 'invoiceItem',
  'payments': 'payment',
  'payment-allocations': 'paymentAllocation',
  'accounts': 'account',
  'receipts': 'receipt',
  'audit-logs': 'auditLog',
  'lease-status-history': 'leaseStatusHistory',
};

@Injectable()
export class AuditLogInterceptor implements NestInterceptor {
  constructor(
    private prisma: PrismaService,
    private auditLogsService: AuditLogsService,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const method = request.method;

    if (!['POST', 'PATCH', 'DELETE'].includes(method)) {
      return next.handle();
    }

    const url = request.url.split('?')[0];
    const parts = url.split('/').filter(Boolean);
    const routeKey = parts[0];

    const modelName = ROUTE_TO_MODEL[routeKey];
    if (!modelName) {
      return next.handle();
    }

    const recordId = parts.length > 1 && !isNaN(Number(parts[1]))
      ? parseInt(parts[1], 10)
      : null;

    const action = method === 'POST' ? 'CREATE' : method === 'PATCH' ? 'UPDATE' : 'DELETE';

    const user = request.user;

    const resolveUserId$ = from(
      user?.id
        ? Promise.resolve(user.id)
        : this.prisma.user.findFirst({
            where: { role: 'admin' },
            select: { id: true },
            orderBy: { id: 'asc' },
          }).then(u => u?.id || 0)
    );

    if (method === 'POST') {
      return next.handle().pipe(
        tap((response) => {
          const afterData = response?.data || response;
          const newId = afterData?.id;
          if (newId) {
            resolveUserId$.subscribe((userId) => {
              if (userId) {
                this.auditLogsService.logAction({
                  userId,
                  action,
                  tableName: routeKey,
                  recordId: newId,
                  afterData,
                }).catch(() => {});
              }
            });
          }
        }),
      );
    }

    if (!recordId) {
      return next.handle();
    }

    const fetchBeforeData$ = from(this.fetchRecord(modelName, recordId));

    return forkJoin([fetchBeforeData$, resolveUserId$]).pipe(
      switchMap(([beforeData, userId]) =>
        next.handle().pipe(
          tap((response) => {
            const afterData = method === 'PATCH' ? (response?.data || response) : undefined;
            if (userId) {
              this.auditLogsService.logAction({
                userId,
                action,
                tableName: routeKey,
                recordId,
                beforeData,
                afterData,
              }).catch(() => {});
            }
          }),
        ),
      ),
    );
  }

  private async fetchRecord(modelName: string, id: number): Promise<any> {
    try {
      const model = (this.prisma as any)[modelName];
      return await model.findUnique({ where: { id } });
    } catch {
      return null;
    }
  }
}
