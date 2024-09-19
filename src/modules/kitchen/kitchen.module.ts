import { Module } from '@nestjs/common';
import { KitchenController } from './controller/kitchen.controller';
import { KitchenService } from './service/kitchen.service';

@Module({
  controllers: [KitchenController],
  providers: [KitchenService],
})
export class KitchenModule {}
