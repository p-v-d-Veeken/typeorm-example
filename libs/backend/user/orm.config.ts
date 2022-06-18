import { DataSource } from 'typeorm';
import { SqliteConnectionOptions } from 'typeorm/driver/sqlite/SqliteConnectionOptions';

const config = {
  type: 'sqlite',
  name: 'user',
  database: 'db/user.sqlite3',
  entities: ['libs/backend/user/src/lib/domain/*.entity.ts'],
  migrations: ['libs/backend/user/src/lib/infrastructure/*.ts'],
};

// @ts-ignore
export default new DataSource(config as SqliteConnectionOptions);
