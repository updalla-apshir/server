// Shared entity interfaces for frontend/backend compatibility
export interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'accountant';
  status: 'active' | 'inactive';
  lastLoginAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Property {
  id: number;
  name: string;
  address: string;
  city: string;
  country: string;
  landArea: number;
  createdAt: Date;
}

export interface Building {
  id: number;
  propertyId: number;
  name: string;
  type: 'residential' | 'commercial' | 'industrial' | 'mixed_use';
  floorsCount: number;
  totalArea: number;
  status: string;
  createdAt: Date;
  property?: Property;
}

export interface Unit {
  id: number;
  buildingId: number;
  unitNumber: string;
  floor: number;
  area: number;
  usageType: 'office' | 'shop' | 'storage' | 'apartment';
  baseRent: number;
  status: 'vacant' | 'occupied' | 'maintenance';
  createdAt: Date;
  building?: Building;
  lease?: Lease;
}

export interface Tenant {
  id: number;
  name: string;
  type: 'company' | 'individual';
  phone: string;
  createdAt: Date;
}

export interface Lease {
  id: number;
  leaseNumber: string;
  tenantId: number;
  unitId: number;
  startDate: Date;
  endDate: Date;
  billingCycleMonths:
    | 'ONE_MONTH'
    | 'THREE_MONTHS'
    | 'FOUR_MONTHS'
    | 'SIX_MONTHS'
    | 'TWELVE_MONTHS';
  gracePeriodDays: number;
  depositAmount: number;
  depositStatus: 'held' | 'refunded' | 'deducted';
  status: 'draft' | 'active' | 'expired' | 'terminated';
  createdAt: Date;
  tenant?: Tenant;
  unit?: Unit;
}

export interface Invoice {
  id: number;
  leaseId: number;
  invoiceNumber: string;
  issueDate: Date;
  dueDate: Date;
  totalAmount: number;
  paidAmount: number;
  balanceAmount: number;
  status: 'pending' | 'paid' | 'overdue';
  createdAt: Date;
}

export interface Payment {
  id: number;
  tenantId: number;
  accountId: number;
  amount: number;
  paymentDate: Date;
  method: 'cash' | 'bank' | 'mobile';
  referenceNo: string;
  createdAt: Date;
}
