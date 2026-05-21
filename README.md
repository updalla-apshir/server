# Property Management Server - Modular Architecture Blueprint

This is a comprehensive, production-ready backend server structure using a modular architecture for property management operations.

## 🏗️ Architecture Overview

The server is designed with clean separation of concerns, dependency injection, and scalable modular architecture. Each feature is encapsulated within its own independent module containing controllers, services, repositories, and domain logic.

### Key Principles:
- **Modular Design**: Each entity has its own module with clear boundaries
- **Dependency Injection**: Clean IoC container with proper service registration
- **Generic CRUD Operations**: Base repository and service classes for consistent operations
- **Zod Validation**: Shared DTOs with Zod schemas for frontend/backend compatibility
- **Prisma ORM**: Type-safe database operations with PostgreSQL
- **Scalability**: Designed to handle high load with proper indexing and caching

## 📁 Directory Structure

```
server/
├── src/
│   ├── shared/
│   │   ├── dto/                 # Shared DTOs with Zod schemas
│   │   │   ├── user/
│   │   │   ├── property/
│   │   │   ├── building/
│   │   │   ├── unit/
│   │   │   ├── lease/
│   │   │   └── ...
│   │   ├── entities/            # Shared entity interfaces
│   │   └── types/
│   │       ├── common.ts        # Common types and schemas
│   │       └── index.ts
│   ├── core/
│   │   ├── config/              # Configuration management
│   │   │   ├── config.module.ts
│   │   │   ├── config.service.ts
│   │   │   └── configuration.ts
│   │   ├── database/            # Database layer
│   │   │   ├── database.module.ts
│   │   │   ├── database.service.ts
│   │   │   └── prisma.service.ts
│   │   ├── logger/              # Centralized logging
│   │   ├── middleware/          # HTTP middleware
│   │   ├── guards/              # Authentication guards
│   │   ├── interceptors/        # Response/request interceptors
│   │   ├── filters/             # Exception filters
│   │   ├── pipes/               # Validation pipes
│   │   └── common/
│   │       ├── base.repository.ts  # Generic repository base
│   │       ├── base.service.ts     # Generic service base
│   │       └── interfaces.ts       # Common interfaces
│   ├── modules/                 # Feature modules
│   │   ├── auth/               # Authentication module
│   │   ├── users/              # User management
│   │   ├── properties/         # Property management
│   │   ├── buildings/          # Building management
│   │   ├── units/              # Unit management
│   │   ├── service-charges/    # Service charge management
│   │   ├── parking-spaces/     # Parking space management
│   │   ├── tenants/            # Tenant management
│   │   ├── tenant-contacts/    # Tenant contact management
│   │   ├── leases/             # Lease management
│   │   │   └── lease-service-view.service.ts
│   │   ├── invoices/           # Invoice management
│   │   ├── invoice-items/      # Invoice item management
│   │   ├── payments/           # Payment management
│   │   ├── payment-allocations/# Payment allocation management
│   │   ├── accounts/           # Account management
│   │   ├── receipts/           # Receipt management
│   │   ├── audit-logs/         # Audit logging
│   │   └── lease-status-history/ # Lease status tracking
│   ├── app.module.ts          # Root module with orchestration
│   ├── app.controller.ts
│   └── main.ts
├── prisma/
│   ├── schema.prisma          # Complete Prisma schema
│   └── migrations/
├── test/
├── .env.example
├── package.json
├── tsconfig.json
└── README.md
```

## 🔧 Core Components

### 1. Configuration Management
- Environment-based configuration with validation
- Centralized config service with type safety
- Support for different environments (dev, prod, test)

### 2. Database Layer
- Prisma ORM with PostgreSQL
- Connection pooling and health checks
- Type-safe queries with generated client
- Migration support

### 3. Generic CRUD Framework
- `BaseRepository<T>`: Generic repository with common operations
- `BaseService<T>`: Business logic layer with error handling
- `IRepository<T>` & `IService<T>`: Clean interfaces

### 4. Shared DTOs with Zod
- Frontend/backend compatible schemas
- Runtime validation with detailed error messages
- Type inference from schemas

### 5. Modular Architecture
Each module follows the same structure:
```
modules/[entity]/
├── [entity].module.ts       # Module definition with DI
├── [entity].controller.ts   # REST API endpoints
├── [entity].service.ts      # Business logic
├── [entity].repository.ts   # Data access layer
└── dto/                     # Module-specific DTOs
    ├── create-[entity].dto.ts
    └── update-[entity].dto.ts
```

## 🗄️ Database Schema

Complete schema with 18+ entities including:
- **Users**: System access with roles (admin, manager, accountant)
- **Properties**: Real estate properties with location data
- **Buildings**: Structures within properties with type classification
- **Units**: Rentable spaces with usage types and status
- **Leases**: Contracts with billing cycles and status tracking
- **Invoices & Payments**: Financial operations with allocations
- **Tenants & Contacts**: Customer management
- **Audit Logs**: Complete audit trail
- **Service Charges**: Building-level cost sharing

## 🚀 Key Features Implemented

### 1. Lease Service View Calculation
- Prorated service charges based on unit area ratio
- Automatic calculation of monthly costs
- Building-level service charge management

### 2. Comprehensive CRUD Operations
- Generic base classes for all entities
- Consistent API patterns across modules
- Pagination, filtering, and sorting support

### 3. Data Relationships
- Proper foreign key relationships
- Cascading operations where appropriate
- Include/relation support for complex queries

### 4. Validation & Error Handling
- Zod schema validation at runtime
- Centralized error responses
- Type-safe operations throughout

### 5. Scalability Features
- Repository pattern for data access
- Service layer for business logic
- Modular design for easy extension
- Database indexing strategy

## 🛠️ Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Configuration**
   ```bash
   cp .env.example .env
   # Configure DATABASE_URL, JWT_SECRET, etc.
   ```

3. **Database Setup**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

4. **Development Server**
   ```bash
   npm run start:dev
   ```

## 📡 API Endpoints

### Properties
- `GET /properties` - List properties with pagination
- `POST /properties` - Create new property
- `GET /properties/:id` - Get property details
- `GET /properties/:id/buildings` - Get property buildings
- `PATCH /properties/:id` - Update property
- `DELETE /properties/:id` - Delete property

### Buildings
- `GET /buildings` - List buildings
- `GET /buildings/property/:propertyId` - Buildings by property
- `GET /buildings/type/:type` - Buildings by type
- `POST /buildings` - Create building
- `PATCH /buildings/:id` - Update building

### Units
- `GET /units` - List units
- `GET /units/building/:buildingId` - Units by building
- `GET /units/status/available` - Available units
- `POST /units` - Create unit
- `PATCH /units/:id` - Update unit

### Leases
- `GET /leases` - List leases
- `GET /leases/tenant/:tenantId` - Leases by tenant
- `GET /leases/unit/:unitId` - Lease by unit
- `GET /leases/status/active` - Active leases
- `GET /leases/:id/service-view` - Lease service charges
- `POST /leases` - Create lease
- `PATCH /leases/:id` - Update lease

### Users
- `GET /users` - List users (admin only)
- `GET /users/role/:role` - Users by role
- `POST /users` - Create user
- `PATCH /users/:id` - Update user

## 🔐 Security Features

- JWT-based authentication
- Role-based access control (admin, manager, accountant)
- Password hashing with bcrypt
- Request validation and sanitization
- Rate limiting and CORS configuration

## 🧪 Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## 📈 Performance Optimizations

1. **Database Indexing**: Strategic indexes on frequently queried fields
2. **Query Optimization**: Efficient Prisma queries with select/include
3. **Caching Strategy**: Redis integration for expensive operations
4. **Connection Pooling**: Optimized database connections
5. **Lazy Loading**: Selective data loading to reduce payload size

## 🔄 Data Flow

```
Client Request → Controller → Service → Repository → Database
                      ↓
               Validation & DTOs
                      ↓
               Error Handling & Logging
```

## 🎯 Business Logic Highlights

### Lease Management
- Automatic status tracking with history
- Service charge prorating based on unit area
- Conflict prevention (unit double-booking)
- Financial calculations and reporting

### Financial Operations
- Invoice generation with billing cycles
- Payment allocation to invoices
- Balance tracking and overdue detection
- Receipt generation

### Audit Trail
- Complete user action logging
- Lease status change history
- Data integrity tracking

## 🚀 Deployment

The architecture supports containerized deployment with:
- Docker configuration
- Environment-based configuration
- Health check endpoints
- Graceful shutdown handling
- Database migration scripts

## 📚 Further Development

The modular architecture makes it easy to:
- Add new entities following the established pattern
- Implement additional business logic
- Add caching, monitoring, or other cross-cutting concerns
- Scale individual modules independently
- Maintain clean separation of concerns

This blueprint provides a solid foundation for a production-ready property management system with room for growth and customization.