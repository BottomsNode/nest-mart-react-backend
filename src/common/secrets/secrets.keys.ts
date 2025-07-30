import * as dotenv from 'dotenv';
import { existsSync } from 'fs';

const envPath = `.env.${process.env.NODE_ENV || 'development'}`;

dotenv.config({
    path: existsSync(envPath) ? envPath : './.env',
});

export const PORT = process.env.PORT;
export const DB_NAME = process.env.DB_NAME;
export const DB_TYPE = process.env.DB_TYPE;
export const DB_HOST = process.env.DB_HOST;
export const DB_PORT = process.env.DB_PORT;
export const DB_USERNAME = process.env.DB_USERNAME;
export const DB_PASSWORD = process.env.DB_PASSWORD;
export const SWAGGER_DOCS = process.env.SWAGGER_DOCS;
export const jwtSecret = process.env.JWT_SECRET;
export const NODE_ENV = process.env.NODE_ENV;
export const SESSION_SECRET = process.env.SESSION_SECRET;
export const DB_SSL_MODE = process.env.DB_SSL_MODE;
export const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
export const CLOUDINARY_UPLOAD_PRESET = process.env.CLOUDINARY_UPLOAD_PRESET;
export const CLOUDINARY_SECRET_KEY = process.env.CLOUDINARY_SECRET_KEY;
export const REDIS_HOST = process.env.REDIS_HOST;
export const REDIS_PORT = process.env.REDIS_PORT;
export const REDIS_PASSWORD = process.env.REDIS_PASSWORD;
export const PUBLIC_KEY = 'isPublic';

export const MAIL_HOST = process.env.MAIL_HOST;
export const MAIL_PORT = process.env.MAIL_PORT;
export const MAIL_USER = process.env.MAIL_USER;
export const MAIL_PASS = process.env.MAIL_PASS;
export const MAIL_SECURE = process.env.MAIL_SECURE;
