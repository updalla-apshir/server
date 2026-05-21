import { z } from 'zod';
import {
  idSchema,
  decimalSchema,
  InvoiceItemTypeSchema,
} from 'src/shared/types/common';

export const createInvoiceItemSchema = z.object({
  invoiceId: idSchema,
  description: z.string().min(1).max(255),
  amount: decimalSchema,
  type: InvoiceItemTypeSchema,
});

export const updateInvoiceItemSchema = z
  .object({
    invoiceId: idSchema.optional(),
    description: z.string().min(1).max(255).optional(),
    amount: decimalSchema.optional(),
    type: InvoiceItemTypeSchema.optional(),
  })
  .refine(
    (data) => Object.keys(data).length > 0,
    'At least one field must be provided for update',
  );

export type CreateInvoiceItemDto = z.infer<typeof createInvoiceItemSchema>;
export type UpdateInvoiceItemDto = z.infer<typeof updateInvoiceItemSchema>;
