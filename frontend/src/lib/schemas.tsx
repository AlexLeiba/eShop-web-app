import * as z from 'zod';

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
});

export type LoginType = z.infer<typeof LoginSchema>;

export const RegisterSchema = z
  .object({
    name: z.string().optional(),
    lastName: z.string().optional(),
    userName: z.string().min(2, 'Username must be at least 2 characters long'),
    email: z.string().email(),
    password: z.string().min(8, 'Password must be at least 8 characters long'),
    confirmPassword: z
      .string()
      .min(8, 'Password must be at least 8 characters long'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type RegisterType = z.infer<typeof RegisterSchema>;
