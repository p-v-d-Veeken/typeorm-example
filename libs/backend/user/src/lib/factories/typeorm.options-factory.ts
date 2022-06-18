import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { userEntities } from '../domain/entities';
import { userMigrations } from '../infrastructure/migrations';
import {SqliteConnectionOptions} from "typeorm/driver/sqlite/SqliteConnectionOptions";

@Injectable()
export class UserTypeOrmOptionsFactory implements TypeOrmOptionsFactory {
  async createTypeOrmOptions(): Promise<TypeOrmModuleOptions> {
    return {
      type: 'sqlite',
      database: 'user.sqlite3',
      entities: userEntities,
      migrations: userMigrations,
      synchronize: false,
      logging: false,
      migrationsRun: true,
    } as SqliteConnectionOptions;
  }
}
