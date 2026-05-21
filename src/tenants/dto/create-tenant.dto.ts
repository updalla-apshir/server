import { z } from 'zod';
import {
  idSchema,
  TenantTypeSchema,
  phoneSchema,
} from 'src/shared/types/common';

export const createTenantSchema = z.object({
  name: z.string().min(1).max(100),
  type: TenantTypeSchema,
  phone: phoneSchema,
});

export const updateTenantSchema = z
  .object({
    name: z.string().min(1).max(100).optional(),
    type: TenantTypeSchema.optional(),
    phone: phoneSchema.optional(),
  })
  .refine(
    (data) => Object.keys(data).length > 0,
    'At least one field must be provided for update',
  );

export type CreateTenantDto = z.infer<typeof createTenantSchema>;
export type UpdateTenantDto = z.infer<typeof updateTenantSchema>;
