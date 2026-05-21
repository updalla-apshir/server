import { z } from 'zod';
import {
  idSchema,
  phoneSchema,
  ContactRoleSchema,
} from 'src/shared/types/common';

export const createTenantContactSchema = z.object({
  tenantId: idSchema,
  name: z.string().min(1).max(100),
  phone: phoneSchema,
  role: ContactRoleSchema,
});

export const updateTenantContactSchema = z
  .object({
    tenantId: idSchema.optional(),
    name: z.string().min(1).max(100).optional(),
    phone: phoneSchema.optional(),
    role: ContactRoleSchema.optional(),
  })
  .refine(
    (data) => Object.keys(data).length > 0,
    'At least one field must be provided for update',
  );

export type CreateTenantContactDto = z.infer<typeof createTenantContactSchema>;
export type UpdateTenantContactDto = z.infer<typeof updateTenantContactSchema>;
