import { Injectable, Inject } from '@nestjs/common';
import { DatabaseService } from 'src/modules/database/service/database.service';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class KitchenService {
  constructor(
    private databaseService: DatabaseService,
    @Inject('KAFKA_CLIENT') private kafkaService: ClientProxy,
  ) {}
  newOrder(order: number) {
    const foodRecipe = this.databaseService.getRecipeByCode(order);
    this.databaseService.statusOrder(foodRecipe.id, 'CREATE');
    this.kafkaService.emit('store-order', foodRecipe);
    return { message: 'ORDER CREATE' };
  }
}
