import { z } from 'zod';
import { idSchema } from 'src/shared/types/common';

export const createAuditLogSchema = z.object({
  userId: idSchema,
  action: z.string().min(1).max(100),
  tableName: z.string().min(1).max(100),
  recordId: idSchema,
  beforeData: z.any().optional(),
  afterData: z.any().optional(),
});

export const updateAuditLogSchema = z
  .object({
    userId: idSchema.optional(),
    action: z.string().min(1).max(100).optional(),
    tableName: z.string().min(1).max(100).optional(),
    recordId: idSchema.optional(),
    beforeData: z.any().optional(),
    afterData: z.any().optional(),
  })
  .refine(
    (data) => Object.keys(data).length > 0,
    'At least one field must be provided for update',
  );

export type CreateAuditLogDto = z.infer<typeof createAuditLogSchema>;
export type UpdateAuditLogDto = z.infer<typeof updateAuditLogSchema>;
