import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { XhsModule } from './xhs/xhs.module';

@Module({
  imports: [XhsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
