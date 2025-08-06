import {
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_PORT,
  DB_SSL_MODE,
  DB_TYPE,
  DB_USERNAME,
  NODE_ENV,
} from 'src/common';
import { DataSource } from 'typeorm';
export const AppDataSource = new DataSource({
  type: DB_TYPE as 'postgres',
  host: DB_HOST,
  ssl: DB_SSL_MODE === 'require',
  port: Number(DB_PORT),
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_NAME,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../**/migrations/*{.ts,.js}'],
  migrationsRun: false,
  logging: NODE_ENV === 'development',
});
