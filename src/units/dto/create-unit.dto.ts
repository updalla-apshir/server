import { z } from 'zod';
import {
  idSchema,
  decimalSchema,
  UnitUsageTypeSchema,
  UnitStatusSchema,
} from 'src/shared/types/common';

export const createUnitSchema = z.object({
  buildingId: idSchema,
  unitNumber: z.string().min(1).max(50),
  floor: z.number().int().min(0),
  area: decimalSchema,
  usageType: UnitUsageTypeSchema,
  baseRent: decimalSchema,
  status: UnitStatusSchema.optional().default('vacant'),
});

export const updateUnitSchema = z
  .object({
    buildingId: idSchema.optional(),
    unitNumber: z.string().min(1).max(50).optional(),
    floor: z.number().int().min(0).optional(),
    area: decimalSchema.optional(),
    usageType: UnitUsageTypeSchema.optional(),
    baseRent: decimalSchema.optional(),
    status: UnitStatusSchema.optional(),
  })
  .refine(
    (data) => Object.keys(data).length > 0,
    'At least one field must be provided for update',
  );

export type CreateUnitDto = z.infer<typeof createUnitSchema>;
export type UpdateUnitDto = z.infer<typeof updateUnitSchema>;
