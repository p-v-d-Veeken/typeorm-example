import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './domain/user.entity';
import { UserTypeOrmOptionsFactory } from './factories/typeorm.options-factory';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      name: 'user',
      imports: [],
      useClass: UserTypeOrmOptionsFactory,
      inject: [],
    }),
    TypeOrmModule.forFeature([User], 'user'),
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class BackendUserModule {}
