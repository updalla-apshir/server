import { z } from 'zod';
import {
  idSchema,
  LeaseStatusSchema,
  BillingCycleSchema,
  DepositStatusSchema,
  decimalSchema,
} from 'src/shared/types/common';

const createLeaseBaseSchema = z.object({
  tenantId: idSchema,
  unitId: idSchema,
  leaseNumber: z.string().min(1),
  startDate: z.coerce.date(),
  endDate: z.coerce.date().optional(),
  billingCycleMonths: BillingCycleSchema,
  gracePeriodDays: z.number().int().min(0),
  depositAmount: decimalSchema,
  depositStatus: DepositStatusSchema,
  status: LeaseStatusSchema.optional().default('draft'),
  parkingSpaceIds: z.array(idSchema).optional(),
});

export const createLeaseSchema = createLeaseBaseSchema.refine(
  (data) => !data.endDate || data.startDate < data.endDate,
  { message: 'End date must be after start date' },
);

export type CreateLeaseDto = z.infer<typeof createLeaseBaseSchema>;

const updateLeaseBaseSchema = z.object({
  tenantId: idSchema.optional(),
  unitId: idSchema.optional(),
  leaseNumber: z.string().min(1).optional(),
  startDate: z.coerce.date().optional(),
  endDate: z.coerce.date().optional(),
  billingCycleMonths: BillingCycleSchema.optional(),
  gracePeriodDays: z.number().int().min(0).optional(),
  depositAmount: decimalSchema.optional(),
  depositStatus: DepositStatusSchema.optional(),
  status: LeaseStatusSchema.optional(),
});

export const updateLeaseSchema = updateLeaseBaseSchema.refine(
  (data) => {
    if (data.startDate && data.endDate) {
      return data.startDate < data.endDate;
    }
    return true;
  },
  { message: 'End date must be after start date' },
);

export type UpdateLeaseDto = z.infer<typeof updateLeaseBaseSchema>;
