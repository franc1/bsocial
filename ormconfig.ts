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
  entities: [__dirname + '/apps/bsocial-api/src/**/*.model.{js,ts}'],
  migrations: [__dirname + '/apps/bsocial-api/src/migrations/*.{js,ts}'],
  subscribers: [__dirname + '/apps/bsocial-api/src/subscribers/**/*.{js,ts}'],
  cli: {
    migrationsDir: __dirname + '/apps/bsocial-api/src/migrations',
    subscribersDir: __dirname + '/apps/bsocial-api/src/subscribers',
  },
} as ConnectionOptions;
