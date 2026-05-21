import { z } from 'zod';
import {
  idSchema,
  decimalSchema,
  PaymentMethodSchema,
} from 'src/shared/types/common';

export const createPaymentSchema = z.object({
  tenantId: idSchema,
  accountId: idSchema,
  amount: decimalSchema,
  paymentDate: z.coerce.date(),
  method: PaymentMethodSchema,
  referenceNo: z.string().min(1).max(100).optional(),
  invoiceId: idSchema.optional(),
});

export const updatePaymentSchema = z
  .object({
    tenantId: idSchema.optional(),
    accountId: idSchema.optional(),
    amount: decimalSchema.optional(),
    paymentDate: z.coerce.date().optional(),
    method: PaymentMethodSchema.optional(),
    referenceNo: z.string().min(1).max(100).optional(),
  })
  .refine(
    (data) => Object.keys(data).length > 0,
    'At least one field must be provided for update',
  );

export type CreatePaymentDto = z.infer<typeof createPaymentSchema>;
export type UpdatePaymentDto = z.infer<typeof updatePaymentSchema>;
