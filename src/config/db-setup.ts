import { MikroORM, Options } from '@mikro-orm/core';

let orm;

const dbSetups = {
  host: '127.0.0.1',
  port: 5432,
  user: 'postgres',
  password: '9173',
  database: 'postgres',
  schema: 'public',
  dbName: 'postgres',
  type: 'postgresql',
  autoLoadEntities: true,
  debug: true,
  migrations: {
    tableName: 'mikro_orm_migrations',
    path: './migrations',
    pattern: /^[\w-]+\d+\.ts$/,
    transactional: true,
    disableForeignKeys: true,
    allOrNothing: true,
    dropTables: true,
    safe: false,
    emit: 'ts',
  },
} as Options;

async function initiate() {
  orm = await MikroORM.init(dbSetups);
  return orm;
}

export { dbSetups, initiate, orm };
