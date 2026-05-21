import { z } from 'zod';
import {
  idSchema,
  decimalSchema,
  ServiceChargeNameSchema,
} from 'src/shared/types/common';

export const createServiceChargeSchema = z.object({
  buildingId: idSchema,
  name: ServiceChargeNameSchema,
  monthlyFee: decimalSchema,
});

export const updateServiceChargeSchema = z
  .object({
    buildingId: idSchema.optional(),
    name: ServiceChargeNameSchema.optional(),
    monthlyFee: decimalSchema.optional(),
  })
  .refine(
    (data) => Object.keys(data).length > 0,
    'At least one field must be provided for update',
  );

export type CreateServiceChargeDto = z.infer<typeof createServiceChargeSchema>;
export type UpdateServiceChargeDto = z.infer<typeof updateServiceChargeSchema>;
