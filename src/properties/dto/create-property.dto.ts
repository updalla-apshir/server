import { z } from 'zod';
import { decimalSchema } from 'src/shared/types/common';

export const createPropertySchema = z.object({
  name: z.string().min(1).max(100),
  address: z.string().min(1).max(255),
  city: z.string().min(1).max(100),
  country: z.string().min(1).max(100),
  landArea: decimalSchema,
});

export const updatePropertySchema = z
  .object({
    name: z.string().min(1).max(100).optional(),
    address: z.string().min(1).max(255).optional(),
    city: z.string().min(1).max(100).optional(),
    country: z.string().min(1).max(100).optional(),
    landArea: decimalSchema.optional(),
  })
  .refine(
    (data) => Object.keys(data).length > 0,
    'At least one field must be provided for update',
  );

export type CreatePropertyDto = z.infer<typeof createPropertySchema>;
export type UpdatePropertyDto = z.infer<typeof updatePropertySchema>;
