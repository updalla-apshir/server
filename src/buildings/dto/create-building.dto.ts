import { z } from 'zod';
import {
  idSchema,
  decimalSchema,
  BuildingTypeSchema,
} from 'src/shared/types/common';

export const createBuildingSchema = z.object({
  propertyId: idSchema,
  name: z.string().min(1).max(100),
  type: BuildingTypeSchema,
  floorsCount: z.number().int().min(1),
  totalArea: decimalSchema,
  status: z.string().optional().default('active'),
});

export const updateBuildingSchema = z
  .object({
    propertyId: idSchema.optional(),
    name: z.string().min(1).max(100).optional(),
    type: BuildingTypeSchema.optional(),
    floorsCount: z.number().int().min(1).optional(),
    totalArea: decimalSchema.optional(),
    status: z.string().optional(),
  })
  .refine(
    (data) => Object.keys(data).length > 0,
    'At least one field must be provided for update',
  );

export type CreateBuildingDto = z.infer<typeof createBuildingSchema>;
export type UpdateBuildingDto = z.infer<typeof updateBuildingSchema>;
