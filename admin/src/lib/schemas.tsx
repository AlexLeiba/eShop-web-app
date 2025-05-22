import * as z from 'zod';

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
});

export type LoginType = z.infer<typeof LoginSchema>;

export const EditProductSchema = z.object({
  roTitle: z.string().min(2, 'roTitle must be at least 2 characters long'),
  enTitle: z.string().min(2, 'enTitle must be at least 2 characters long'),

  roDescription: z
    .string()
    .min(2, 'Ro Description must be at least 2 characters long'),
  enDescription: z
    .string()
    .min(2, 'En Description must be at least 2 characters long'),

  price: z.coerce.string().min(1, 'Price must be at least 1 characters long'),

  image: z.string().min(2, 'Image is required'),

  categories: z.array(z.string()).min(1, 'Category is required'),

  size: z.array(z.string()).min(1, 'Required at least 1 size'),
  color: z.array(z.string()).min(1, 'Required at least 1 color'),

  images: z.array(
    z.object({
      colorName: z.string().min(2, 'Color required'),
      image: z.string().min(2, 'Required at least 1 image'),
    })
  ),
  imageColor: z.string().min(2, 'Image color required'),
  isPublished: z.boolean(),

  inStock: z.boolean().optional(),
  featured: z.boolean().optional(),
  featuredBackgroundColor: z.string().optional(),
  language: z.string().optional(),
  quantity: z.string().optional(),
  moreInfo: z.string().optional(),

  title: z.string().optional(),
  description: z.string().optional(),
});

export const CreateProductSchema = z.object({
  roTitle: z.string().min(2, 'roTitle must be at least 2 characters long'),
  enTitle: z.string().min(2, 'enTitle must be at least 2 characters long'),

  roDescription: z
    .string()
    .min(2, 'Ro Description must be at least 2 characters long'),
  enDescription: z
    .string()
    .min(2, 'En Description must be at least 2 characters long'),

  price: z.coerce.string().min(1, 'Price is required'),
  image: z.string().min(2, 'Image is required'),
  categories: z
    .array(z.string())
    .min(1, 'Categories is required')
    .default(['jakets']),

  size: z.array(z.string()).min(1, 'Size is required'),
  color: z.array(z.string()).min(1, 'Color is required').default(['white']),

  images: z.array(
    z.object({
      colorName: z.string().min(2, 'Color is required'),
      image: z.string().min(2, 'Image is required'),
    })
  ),
  imageColor: z.string().min(2, 'Image color required').default('white'),

  isPublished: z.boolean().default(false),

  inStock: z.boolean().optional().default(true),
  featured: z.boolean().optional().default(false),
  featuredBackgroundColor: z.string().optional().default('#ffffff'),
  language: z.string().optional(),
  quantity: z.string().optional().default('1'),
  moreInfo: z.string().optional(),

  title: z.string().optional(),
  description: z.string().optional(),
});

export type ProductType = z.infer<typeof EditProductSchema>;

export const EditUserSchema = z.object({
  isAdmin: z.boolean(),
});
