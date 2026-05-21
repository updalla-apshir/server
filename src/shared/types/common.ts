import { z } from 'zod';

export const idSchema = z.number().int().positive();
export const emailSchema = z.string().email();
export const phoneSchema = z.string().min(10).max(15);
export const decimalSchema = z.number().positive();

export const paginationSchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(10),
});

export type ID = z.infer<typeof idSchema>;
export type Email = z.infer<typeof emailSchema>;
export type Phone = z.infer<typeof phoneSchema>;
export type Decimal = z.infer<typeof decimalSchema>;
export type PaginationOptions = z.infer<typeof paginationSchema>;

export const UserRoleSchema = z.enum(['admin', 'manager', 'accountant']);
export const UserStatusSchema = z.enum(['active', 'inactive']);
export const BuildingTypeSchema = z.enum([
  'residential',
  'commercial',
  'industrial',
  'mixed_use',
]);
export const UnitUsageTypeSchema = z.enum([
  'office',
  'shop',
  'storage',
  'apartment',
]);
export const UnitStatusSchema = z.enum(['vacant', 'occupied', 'maintenance']);
export const LeaseStatusSchema = z.enum([
  'draft',
  'active',
  'expired',
  'terminated',
]);
export const TenantTypeSchema = z.enum(['company', 'individual']);
export const ContactRoleSchema = z.enum(['primary', 'emergency', 'other']);
export const ServiceChargeNameSchema = z.enum([
  'security',
  'cleaning',
  'elevator',
]);
export const ParkingStatusSchema = z.enum([
  'available',
  'assigned',
  'reserved',
]);
export const InvoiceStatusSchema = z.enum(['pending', 'paid', 'overdue']);
export const InvoiceItemTypeSchema = z.enum([
  'rent',
  'service_charge',
  'parking',
]);
export const PaymentMethodSchema = z.enum(['cash', 'bank', 'mobile']);
export const AccountTypeSchema = z.enum(['cash', 'bank', 'mobile']);
export const AccountStatusSchema = z.enum(['active', 'inactive']);
export const BillingCycleSchema = z.enum([
  'ONE_MONTH',
  'THREE_MONTHS',
  'FOUR_MONTHS',
  'SIX_MONTHS',
  'TWELVE_MONTHS',
]);
export const DepositStatusSchema = z.enum(['held', 'refunded', 'deducted']);

export type UserRole = z.infer<typeof UserRoleSchema>;
export type UserStatus = z.infer<typeof UserStatusSchema>;
export type BuildingType = z.infer<typeof BuildingTypeSchema>;
export type UnitUsageType = z.infer<typeof UnitUsageTypeSchema>;
export type UnitStatus = z.infer<typeof UnitStatusSchema>;
export type LeaseStatus = z.infer<typeof LeaseStatusSchema>;
export type TenantType = z.infer<typeof TenantTypeSchema>;
export type ContactRole = z.infer<typeof ContactRoleSchema>;
export type ServiceChargeName = z.infer<typeof ServiceChargeNameSchema>;
export type ParkingStatus = z.infer<typeof ParkingStatusSchema>;
export type InvoiceStatus = z.infer<typeof InvoiceStatusSchema>;
export type InvoiceItemType = z.infer<typeof InvoiceItemTypeSchema>;
export type PaymentMethod = z.infer<typeof PaymentMethodSchema>;
export type AccountType = z.infer<typeof AccountTypeSchema>;
export type AccountStatus = z.infer<typeof AccountStatusSchema>;
export type BillingCycle = z.infer<typeof BillingCycleSchema>;
export type DepositStatus = z.infer<typeof DepositStatusSchema>;
