import { Module } from '@nestjs/common';
import { KitchenModule } from './modules/kitchen/kitchen.module';
import { StoreModule } from './modules/store/store.module';
import { MarketModule } from './modules/market/market.module';
import { DatabaseModule } from './modules/database/database.module';

@Module({
  imports: [StoreModule, KitchenModule, MarketModule, DatabaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
