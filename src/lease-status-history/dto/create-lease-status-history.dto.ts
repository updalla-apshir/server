import { z } from 'zod';
import { idSchema, LeaseStatusSchema } from 'src/shared/types/common';

export const createLeaseStatusHistorySchema = z.object({
  leaseId: idSchema,
  oldStatus: LeaseStatusSchema.nullable(),
  newStatus: LeaseStatusSchema,
  changedBy: idSchema,
  changedAt: z.date(),
  note: z.string().optional(),
});

export const updateLeaseStatusHistorySchema = z
  .object({
    leaseId: idSchema.optional(),
    oldStatus: LeaseStatusSchema.optional().nullable(),
    newStatus: LeaseStatusSchema.optional(),
    changedBy: idSchema.optional(),
    changedAt: z.date().optional(),
    note: z.string().optional(),
  })
  .refine(
    (data) => Object.keys(data).length > 0,
    'At least one field must be provided for update',
  );

export type CreateLeaseStatusHistoryDto = z.infer<
  typeof createLeaseStatusHistorySchema
>;
export type UpdateLeaseStatusHistoryDto = z.infer<
  typeof updateLeaseStatusHistorySchema
>;
