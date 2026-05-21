import { z } from 'zod';
import {
  idSchema,
  decimalSchema,
} from 'src/shared/types/common';

export const createInvoiceSchema = z.object({
  leaseId: idSchema,
  invoiceNumber: z.string().min(1).max(50),
  issueDate: z.coerce.date(),
  dueDate: z.coerce.date(),
  totalAmount: decimalSchema,
});

export const updateInvoiceSchema = z
  .object({
    leaseId: idSchema.optional(),
    invoiceNumber: z.string().min(1).max(50).optional(),
    issueDate: z.coerce.date().optional(),
    dueDate: z.coerce.date().optional(),
    totalAmount: decimalSchema.optional(),
  })
  .refine(
    (data) => Object.keys(data).length > 0,
    'At least one field must be provided for update',
  );

export type CreateInvoiceDto = z.infer<typeof createInvoiceSchema>;
export type UpdateInvoiceDto = z.infer<typeof updateInvoiceSchema>;
