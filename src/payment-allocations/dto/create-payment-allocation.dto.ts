import { z } from 'zod';
import { idSchema, decimalSchema } from 'src/shared/types/common';

export const createPaymentAllocationSchema = z.object({
  paymentId: idSchema,
  invoiceId: idSchema,
  amountApplied: decimalSchema,
});

export const updatePaymentAllocationSchema = z
  .object({
    paymentId: idSchema.optional(),
    invoiceId: idSchema.optional(),
    amountApplied: decimalSchema.optional(),
  })
  .refine(
    (data) => Object.keys(data).length > 0,
    'At least one field must be provided for update',
  );

export type CreatePaymentAllocationDto = z.infer<
  typeof createPaymentAllocationSchema
>;
export type UpdatePaymentAllocationDto = z.infer<
  typeof updatePaymentAllocationSchema
>;
