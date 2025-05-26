import { v2 as cloudinary } from 'cloudinary';

export function cloudinaryConnect() {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: process.env.ENV === 'production',
  });
}

export const ALLOWED_FORMATS = [
  'jpg',
  'png',
  'gif',
  'webp',
  'svg',
  'jpeg',
  'avif',
];
