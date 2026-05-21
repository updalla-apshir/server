import { z } from 'zod';
import { idSchema, decimalSchema } from 'src/shared/types/common';

export const createReceiptSchema = z.object({
  paymentId: idSchema,
  receiptNumber: z.string().min(1).max(50),
  issuedAt: z.coerce.date(),
  totalAmount: decimalSchema,
});

export const updateReceiptSchema = z
  .object({
    paymentId: idSchema.optional(),
    receiptNumber: z.string().min(1).max(50).optional(),
    issuedAt: z.coerce.date().optional(),
    totalAmount: decimalSchema.optional(),
  })
  .refine(
    (data) => Object.keys(data).length > 0,
    'At least one field must be provided for update',
  );

export type CreateReceiptDto = z.infer<typeof createReceiptSchema>;
export type UpdateReceiptDto = z.infer<typeof updateReceiptSchema>;
