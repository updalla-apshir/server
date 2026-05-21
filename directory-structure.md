server/
├── src/
│   ├── shared/
│   │   ├── dto/
│   │   │   ├── user/
│   │   │   │   ├── create-user.dto.ts
│   │   │   │   ├── update-user.dto.ts
│   │   │   │   └── user.dto.ts
│   │   │   ├── property/
│   │   │   │   ├── create-property.dto.ts
│   │   │   │   ├── update-property.dto.ts
│   │   │   │   └── property.dto.ts
│   │   │   ├── building/
│   │   │   │   ├── create-building.dto.ts
│   │   │   │   ├── update-building.dto.ts
│   │   │   │   └── building.dto.ts
│   │   │   ├── unit/
│   │   │   │   ├── create-unit.dto.ts
│   │   │   │   ├── update-unit.dto.ts
│   │   │   │   └── unit.dto.ts
│   │   │   ├── service-charge/
│   │   │   │   ├── create-service-charge.dto.ts
│   │   │   │   ├── update-service-charge.dto.ts
│   │   │   │   └── service-charge.dto.ts
│   │   │   ├── parking-space/
│   │   │   │   ├── create-parking-space.dto.ts
│   │   │   │   ├── update-parking-space.dto.ts
│   │   │   │   └── parking-space.dto.ts
│   │   │   ├── tenant/
│   │   │   │   ├── create-tenant.dto.ts
│   │   │   │   ├── update-tenant.dto.ts
│   │   │   │   └── tenant.dto.ts
│   │   │   ├── tenant-contact/
│   │   │   │   ├── create-tenant-contact.dto.ts
│   │   │   │   ├── update-tenant-contact.dto.ts
│   │   │   │   └── tenant-contact.dto.ts
│   │   │   ├── lease/
│   │   │   │   ├── create-lease.dto.ts
│   │   │   │   ├── update-lease.dto.ts
│   │   │   │   └── lease.dto.ts
│   │   │   ├── invoice/
│   │   │   │   ├── create-invoice.dto.ts
│   │   │   │   ├── update-invoice.dto.ts
│   │   │   │   └── invoice.dto.ts
│   │   │   ├── invoice-item/
│   │   │   │   ├── create-invoice-item.dto.ts
│   │   │   │   ├── update-invoice-item.dto.ts
│   │   │   │   └── invoice-item.dto.ts
│   │   │   ├── payment/
│   │   │   │   ├── create-payment.dto.ts
│   │   │   │   ├── update-payment.dto.ts
│   │   │   │   └── payment.dto.ts
│   │   │   ├── payment-allocation/
│   │   │   │   ├── create-payment-allocation.dto.ts
│   │   │   │   ├── update-payment-allocation.dto.ts
│   │   │   │   └── payment-allocation.dto.ts
│   │   │   ├── account/
│   │   │   │   ├── create-account.dto.ts
│   │   │   │   ├── update-account.dto.ts
│   │   │   │   └── account.dto.ts
│   │   │   ├── receipt/
│   │   │   │   ├── create-receipt.dto.ts
│   │   │   │   ├── update-receipt.dto.ts
│   │   │   │   └── receipt.dto.ts
│   │   │   ├── audit-log/
│   │   │   │   ├── create-audit-log.dto.ts
│   │   │   │   └── audit-log.dto.ts
│   │   │   └── lease-status-history/
│   │   │       ├── create-lease-status-history.dto.ts
│   │   │       └── lease-status-history.dto.ts
│   │   ├── entities/
│   │   │   ├── user.entity.ts
│   │   │   ├── property.entity.ts
│   │   │   ├── building.entity.ts
│   │   │   ├── unit.entity.ts
│   │   │   ├── service-charge.entity.ts
│   │   │   ├── parking-space.entity.ts
│   │   │   ├── tenant.entity.ts
│   │   │   ├── tenant-contact.entity.ts
│   │   │   ├── lease.entity.ts
│   │   │   ├── invoice.entity.ts
│   │   │   ├── invoice-item.entity.ts
│   │   │   ├── payment.entity.ts
│   │   │   ├── payment-allocation.entity.ts
│   │   │   ├── account.entity.ts
│   │   │   ├── receipt.entity.ts
│   │   │   ├── audit-log.entity.ts
│   │   │   └── lease-status-history.entity.ts
│   │   └── types/
│   │       ├── index.ts
│   │       └── common.ts
│   ├── core/
│   │   ├── config/
│   │   │   ├── config.module.ts
│   │   │   ├── config.service.ts
│   │   │   └── configuration.ts
│   │   ├── database/
│   │   │   ├── database.module.ts
│   │   │   ├── database.service.ts
│   │   │   └── prisma.service.ts
│   │   ├── logger/
│   │   │   ├── logger.module.ts
│   │   │   ├── logger.service.ts
│   │   │   └── winston.config.ts
│   │   ├── middleware/
│   │   │   ├── cors.middleware.ts
│   │   │   ├── helmet.middleware.ts
│   │   │   ├── rate-limit.middleware.ts
│   │   │   └── logging.middleware.ts
│   │   ├── guards/
│   │   │   ├── jwt-auth.guard.ts
│   │   │   ├── roles.guard.ts
│   │   │   └── local-auth.guard.ts
│   │   ├── interceptors/
│   │   │   ├── response.interceptor.ts
│   │   │   ├── timeout.interceptor.ts
│   │   │   └── cache.interceptor.ts
│   │   ├── filters/
│   │   │   ├── http-exception.filter.ts
│   │   │   ├── prisma-exception.filter.ts
│   │   │   └── validation-exception.filter.ts
│   │   ├── pipes/
│   │   │   ├── zod-validation.pipe.ts
│   │   │   └── validation.pipe.ts
│   │   └── common/
│   │       ├── base.repository.ts
│   │       ├── base.service.ts
│   │       └── interfaces.ts
│   ├── modules/
│   │   ├── auth/
│   │   │   ├── auth.module.ts
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.service.ts
│   │   │   ├── jwt.strategy.ts
│   │   │   ├── local.strategy.ts
│   │   │   └── dto/
│   │   │       ├── login.dto.ts
│   │   ├── users/
│   │   │   ├── users.module.ts
│   │   │   ├── users.controller.ts
│   │   │   ├── users.service.ts
│   │   │   ├── users.repository.ts
│   │   │   └── dto/
│   │   │       ├── create-user.dto.ts
│   │   │       └── update-user.dto.ts
│   │   ├── properties/
│   │   │   ├── properties.module.ts
│   │   │   ├── properties.controller.ts
│   │   │   ├── properties.service.ts
│   │   │   ├── properties.repository.ts
│   │   │   └── dto/
│   │   │       ├── create-property.dto.ts
│   │   │       └── update-property.dto.ts
│   │   ├── buildings/
│   │   │   ├── buildings.module.ts
│   │   │   ├── buildings.controller.ts
│   │   │   ├── buildings.service.ts
│   │   │   ├── buildings.repository.ts
│   │   │   └── dto/
│   │   │       ├── create-building.dto.ts
│   │   │       └── update-building.dto.ts
│   │   ├── units/
│   │   │   ├── units.module.ts
│   │   │   ├── units.controller.ts
│   │   │   ├── units.service.ts
│   │   │   ├── units.repository.ts
│   │   │   └── dto/
│   │   │       ├── create-unit.dto.ts
│   │   │       └── update-unit.dto.ts
│   │   ├── service-charges/
│   │   │   ├── service-charges.module.ts
│   │   │   ├── service-charges.controller.ts
│   │   │   ├── service-charges.service.ts
│   │   │   ├── service-charges.repository.ts
│   │   │   └── dto/
│   │   │       ├── create-service-charge.dto.ts
│   │   │       └── update-service-charge.dto.ts
│   │   ├── parking-spaces/
│   │   │   ├── parking-spaces.module.ts
│   │   │   ├── parking-spaces.controller.ts
│   │   │   ├── parking-spaces.service.ts
│   │   │   ├── parking-spaces.repository.ts
│   │   │   └── dto/
│   │   │       ├── create-parking-space.dto.ts
│   │   │       └── update-parking-space.dto.ts
│   │   ├── tenants/
│   │   │   ├── tenants.module.ts
│   │   │   ├── tenants.controller.ts
│   │   │   ├── tenants.service.ts
│   │   │   ├── tenants.repository.ts
│   │   │   └── dto/
│   │   │       ├── create-tenant.dto.ts
│   │   │       └── update-tenant.dto.ts
│   │   ├── tenant-contacts/
│   │   │   ├── tenant-contacts.module.ts
│   │   │   ├── tenant-contacts.controller.ts
│   │   │   ├── tenant-contacts.service.ts
│   │   │   ├── tenant-contacts.repository.ts
│   │   │   └── dto/
│   │   │       ├── create-tenant-contact.dto.ts
│   │   │       └── update-tenant-contact.dto.ts
│   │   ├── leases/
│   │   │   ├── leases.module.ts
│   │   │   ├── leases.controller.ts
│   │   │   ├── leases.service.ts
│   │   │   ├── leases.repository.ts
│   │   │   ├── lease-service-view.service.ts
│   │   │   └── dto/
│   │   │       ├── create-lease.dto.ts
│   │   │       └── update-lease.dto.ts
│   │   ├── invoices/
│   │   │   ├── invoices.module.ts
│   │   │   ├── invoices.controller.ts
│   │   │   ├── invoices.service.ts
│   │   │   ├── invoices.repository.ts
│   │   │   └── dto/
│   │   │       ├── create-invoice.dto.ts
│   │   │       └── update-invoice.dto.ts
│   │   ├── invoice-items/
│   │   │   ├── invoice-items.module.ts
│   │   │   ├── invoice-items.controller.ts
│   │   │   ├── invoice-items.service.ts
│   │   │   ├── invoice-items.repository.ts
│   │   │   └── dto/
│   │   │       ├── create-invoice-item.dto.ts
│   │   │       └── update-invoice-item.dto.ts
│   │   ├── payments/
│   │   │   ├── payments.module.ts
│   │   │   ├── payments.controller.ts
│   │   │   ├── payments.service.ts
│   │   │   ├── payments.repository.ts
│   │   │   └── dto/
│   │   │       ├── create-payment.dto.ts
│   │   │       └── update-payment.dto.ts
│   │   ├── payment-allocations/
│   │   │   ├── payment-allocations.module.ts
│   │   │   ├── payment-allocations.controller.ts
│   │   │   ├── payment-allocations.service.ts
│   │   │   ├── payment-allocations.repository.ts
│   │   │   └── dto/
│   │   │       ├── create-payment-allocation.dto.ts
│   │   │       └── update-payment-allocation.dto.ts
│   │   ├── accounts/
│   │   │   ├── accounts.module.ts
│   │   │   ├── accounts.controller.ts
│   │   │   ├── accounts.service.ts
│   │   │   ├── accounts.repository.ts
│   │   │   └── dto/
│   │   │       ├── create-account.dto.ts
│   │   │       └── update-account.dto.ts
│   │   ├── receipts/
│   │   │   ├── receipts.module.ts
│   │   │   ├── receipts.controller.ts
│   │   │   ├── receipts.service.ts
│   │   │   ├── receipts.repository.ts
│   │   │   └── dto/
│   │   │       ├── create-receipt.dto.ts
│   │   │       └── update-receipt.dto.ts
│   │   ├── audit-logs/
│   │   │   ├── audit-logs.module.ts
│   │   │   ├── audit-logs.controller.ts
│   │   │   ├── audit-logs.service.ts
│   │   │   ├── audit-logs.repository.ts
│   │   │   └── dto/
│   │   │       └── create-audit-log.dto.ts
│   │   └── lease-status-history/
│   │       ├── lease-status-history.module.ts
│   │       ├── lease-status-history.controller.ts
│   │       ├── lease-status-history.service.ts
│   │       ├── lease-status-history.repository.ts
│   │       └── dto/
│   │           └── create-lease-status-history.dto.ts
│   ├── app.module.ts
│   ├── app.controller.ts
│   └── main.ts
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── test/
│   ├── app.e2e-spec.ts
│   └── jest-e2e.json
├── .env
├── .env.example
├── package.json
├── tsconfig.json
├── nest-cli.json
└── README.md