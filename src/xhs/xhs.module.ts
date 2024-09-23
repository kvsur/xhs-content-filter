import { Module } from '@nestjs/common';
import { XhsService } from './xhs.service';
import { XhsController } from './xhs.controller';

@Module({
  providers: [XhsService],
  controllers: [XhsController],
})
export class XhsModule {}
