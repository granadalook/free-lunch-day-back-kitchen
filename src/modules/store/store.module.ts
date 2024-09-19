import { Module } from '@nestjs/common';
import { StoreService } from './service/store.service';
import { StoreController } from './controller/store.controller';

@Module({
  controllers: [StoreController],
  providers: [StoreService],
})
export class StoreModule {}
