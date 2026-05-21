import { z } from 'zod';
import {
  idSchema,
  decimalSchema,
  ParkingStatusSchema,
} from 'src/shared/types/common';

export const createParkingSpaceSchema = z.object({
  buildingId: idSchema,
  leaseId: idSchema.optional(),
  slotNumber: z.string().min(1).max(50),
  monthlyFee: decimalSchema,
  status: ParkingStatusSchema.optional().default('available'),
});

export const updateParkingSpaceSchema = z
  .object({
    buildingId: idSchema.optional(),
    leaseId: idSchema.optional().nullable(),
    slotNumber: z.string().min(1).max(50).optional(),
    monthlyFee: decimalSchema.optional(),
    status: ParkingStatusSchema.optional(),
  })
  .refine(
    (data) => Object.keys(data).length > 0,
    'At least one field must be provided for update',
  );

export type CreateParkingSpaceDto = z.infer<typeof createParkingSpaceSchema>;
export type UpdateParkingSpaceDto = z.infer<typeof updateParkingSpaceSchema>;
