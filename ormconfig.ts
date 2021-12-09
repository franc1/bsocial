import { ConnectionOptions } from 'typeorm';

export = {
  name: 'default',
  type: 'mysql',
  host: process.env.dbHost,
  port: +process.env.dbPort,
  username: process.env.dbUser,
  password: process.env.dbPass,
  database: process.env.dbName,
  logger: 'advanced-console',
  logging: process.env.NODE_ENV !== 'production',
  migrationsRun: true,
  entities: [__dirname + '/src/**/*.model.{js,ts}'],
  migrations: [__dirname + '/src/migrations/*.{js,ts}'],
  subscribers: [__dirname + '/src/subscribers/**/*.{js,ts}'],
} as ConnectionOptions;
