import { z } from 'zod';
import {
  decimalSchema,
  AccountTypeSchema,
  AccountStatusSchema,
} from 'src/shared/types/common';

export const createAccountSchema = z.object({
  name: z.string().min(1).max(100),
  type: AccountTypeSchema,
  accountNumber: z.string().min(1).max(50),
  currency: z.string().min(3).max(3),
  balance: decimalSchema,
  status: AccountStatusSchema.default('active'),
});

export const updateAccountSchema = z
  .object({
    name: z.string().min(1).max(100).optional(),
    type: AccountTypeSchema.optional(),
    accountNumber: z.string().min(1).max(50).optional(),
    currency: z.string().min(3).max(3).optional(),
    balance: decimalSchema.optional(),
    status: AccountStatusSchema.optional(),
  })
  .refine(
    (data) => Object.keys(data).length > 0,
    'At least one field must be provided for update',
  );

export type CreateAccountDto = z.infer<typeof createAccountSchema>;
export type UpdateAccountDto = z.infer<typeof updateAccountSchema>;
