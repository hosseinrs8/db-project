import { MikroORM, Options } from '@mikro-orm/core';

let orm;

const dbSetups = {
  host: '127.0.0.1',
  port: 5432,
  user: 'psuser',
  password: '8001',
  database: 'postgres',
  schema: 'public',
  dbName: 'postgres',
  type: 'postgresql',
  autoLoadEntities: true,
  debug: false,
} as Options;

async function initiate() {
  orm = await MikroORM.init(dbSetups);
  return orm;
}

export { dbSetups, initiate, orm };
