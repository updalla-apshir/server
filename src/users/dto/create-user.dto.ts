import { z } from 'zod';

const UserRoleSchema = z.enum(['admin', 'manager', 'accountant']);
const UserStatusSchema = z.enum(['active', 'inactive']);

export const createUserSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  password: z.string().min(8),
  role: UserRoleSchema,
  status: UserStatusSchema.optional().default('active'),
});

export const updateUserSchema = z
  .object({
    name: z.string().min(2).max(100).optional(),
    email: z.string().email().optional(),
    password: z.string().min(8).optional(),
    role: UserRoleSchema.optional(),
    status: UserStatusSchema.optional(),
  })
  .refine(
    (data) => Object.keys(data).length > 0,
    'At least one field must be provided for update',
  );

export type CreateUserDto = z.infer<typeof createUserSchema>;
export type UpdateUserDto = z.infer<typeof updateUserSchema>;
