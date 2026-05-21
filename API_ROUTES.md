# API Routes Documentation

## 📍 Route Structure

All routes follow RESTful conventions with NestJS controllers. Each module has its own controller with the base path defined by the `@Controller()` decorator.

## 🏠 Properties Routes

**Base Path:** `/properties`

| Method | Endpoint | Description | Parameters |
|--------|----------|-------------|------------|
| `POST` | `/properties` | Create new property | Body: `CreatePropertyDto` |
| `GET` | `/properties` | Get all properties (paginated) | Query: `page`, `limit` |
| `GET` | `/properties/:id` | Get property by ID | Path: `id` |
| `GET` | `/properties/:id/buildings` | Get property with buildings | Path: `id` |
| `GET` | `/properties/city/:city` | Get properties by city | Path: `city` |
| `PATCH` | `/properties/:id` | Update property | Path: `id`, Body: `UpdatePropertyDto` |
| `DELETE` | `/properties/:id` | Delete property | Path: `id` |

## 🏢 Buildings Routes

**Base Path:** `/buildings`

| Method | Endpoint | Description | Parameters |
|--------|----------|-------------|------------|
| `POST` | `/buildings` | Create new building | Body: `CreateBuildingDto` |
| `GET` | `/buildings` | Get all buildings (paginated) | Query: `page`, `limit` |
| `GET` | `/buildings/:id` | Get building by ID | Path: `id` |
| `GET` | `/buildings/property/:propertyId` | Get buildings by property | Path: `propertyId` |
| `GET` | `/buildings/type/:type` | Get buildings by type | Path: `type` |
| `PATCH` | `/buildings/:id` | Update building | Path: `id`, Body: `UpdateBuildingDto` |
| `DELETE` | `/buildings/:id` | Delete building | Path: `id` |

## 🚪 Units Routes

**Base Path:** `/units`

| Method | Endpoint | Description | Parameters |
|--------|----------|-------------|------------|
| `POST` | `/units` | Create new unit | Body: `CreateUnitDto` |
| `GET` | `/units` | Get all units (paginated) | Query: `page`, `limit` |
| `GET` | `/units/:id` | Get unit by ID | Path: `id` |
| `GET` | `/units/building/:buildingId` | Get units by building | Path: `buildingId` |
| `GET` | `/units/status/available` | Get available units | - |
| `GET` | `/units/status/:status` | Get units by status | Path: `status` |
| `PATCH` | `/units/:id` | Update unit | Path: `id`, Body: `UpdateUnitDto` |
| `DELETE` | `/units/:id` | Delete unit | Path: `id` |

## 📄 Leases Routes

**Base Path:** `/leases`

| Method | Endpoint | Description | Parameters |
|--------|----------|-------------|------------|
| `POST` | `/leases` | Create new lease | Body: `CreateLeaseDto` |
| `GET` | `/leases` | Get all leases (paginated) | Query: `page`, `limit` |
| `GET` | `/leases/:id` | Get lease by ID | Path: `id` |
| `GET` | `/leases/tenant/:tenantId` | Get leases by tenant | Path: `tenantId` |
| `GET` | `/leases/unit/:unitId` | Get lease by unit | Path: `unitId` |
| `GET` | `/leases/status/active` | Get active leases | - |
| `PATCH` | `/leases/:id` | Update lease | Path: `id`, Body: `UpdateLeaseDto` |
| `DELETE` | `/leases/:id` | Delete lease | Path: `id` |

## 👥 Users Routes

**Base Path:** `/users`

| Method | Endpoint | Description | Parameters |
|--------|----------|-------------|------------|
| `POST` | `/users` | Create new user | Body: `CreateUserDto` |
| `GET` | `/users` | Get all users (paginated) | Query: `page`, `limit` |
| `GET` | `/users/:id` | Get user by ID | Path: `id` |
| `GET` | `/users/role/:role` | Get users by role | Path: `role` |
| `PATCH` | `/users/:id` | Update user | Path: `id`, Body: `UpdateUserDto` |
| `DELETE` | `/users/:id` | Delete user | Path: `id` |

## 🔐 Authentication Routes (if implemented)

**Base Path:** `/auth`

| Method | Endpoint | Description | Parameters |
|--------|----------|-------------|------------|
| `POST` | `/auth/login` | User login | Body: `{email, password}` |
| `POST` | `/auth/register` | User registration | Body: `CreateUserDto` |

## 📊 Additional Routes Structure

### Service Charges
- `GET /service-charges` - List service charges
- `GET /service-charges/building/:buildingId` - Service charges by building
- `POST /service-charges` - Create service charge
- `PATCH /service-charges/:id` - Update service charge

### Parking Spaces
- `GET /parking-spaces` - List parking spaces
- `GET /parking-spaces/building/:buildingId` - Parking spaces by building
- `GET /parking-spaces/status/:status` - Parking spaces by status
- `POST /parking-spaces` - Create parking space

### Tenants
- `GET /tenants` - List tenants
- `GET /tenants/type/:type` - Tenants by type
- `POST /tenants` - Create tenant
- `PATCH /tenants/:id` - Update tenant

### Invoices
- `GET /invoices` - List invoices
- `GET /invoices/lease/:leaseId` - Invoices by lease
- `GET /invoices/status/:status` - Invoices by status
- `POST /invoices` - Create invoice

### Payments
- `GET /payments` - List payments
- `GET /payments/tenant/:tenantId` - Payments by tenant
- `POST /payments` - Create payment

## 🔍 Query Parameters

Most list endpoints support:

- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10, max: 100)
- `sort`: Sort field and order (e.g., `sort=createdAt:desc`)
- `filters`: Additional filtering options

Example:
```
GET /properties?page=2&limit=20&sort=name:asc
```

## 📝 Request/Response Format

### Request Body Example
```json
POST /properties
{
  "name": "Downtown Plaza",
  "address": "123 Main St",
  "city": "New York",
  "country": "USA",
  "landArea": 5000.50
}
```

### Response Format
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Downtown Plaza",
    "address": "123 Main St",
    "city": "New York",
    "country": "USA",
    "landArea": 5000.5,
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

### Error Response Format
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation failed",
    "details": [
      {
        "field": "email",
        "message": "Invalid email format"
      }
    ]
  }
}
```

## 🛡️ Route Guards & Middleware

- **Authentication**: JWT required for protected routes
- **Authorization**: Role-based access (admin, manager, accountant)
- **Validation**: Zod schema validation on all inputs
- **Rate Limiting**: Configurable request rate limits
- **CORS**: Configurable cross-origin resource sharing

## 🔗 Route Registration

Routes are automatically registered through NestJS module system:

```typescript
// In app.module.ts
@Module({
  imports: [
    PropertiesModule,  // Registers /properties/*
    BuildingsModule,   // Registers /buildings/*
    UnitsModule,       // Registers /units/*
    LeasesModule,      // Registers /leases/*
    UsersModule,       // Registers /users/*
    // ... other modules
  ],
})
export class AppModule {}
```

Each module's controller defines its routes using decorators like `@Controller('properties')`, `@Get()`, `@Post()`, etc.