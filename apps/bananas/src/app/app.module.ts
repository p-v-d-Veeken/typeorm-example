import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BackendUserModule } from '@typeorm-example/backend/user';

@Module({
  imports: [BackendUserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
