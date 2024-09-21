import { Injectable, Inject } from '@nestjs/common';
import { DatabaseService } from 'src/modules/database/service/database.service';
import { ClientProxy } from '@nestjs/microservices';
import { OrderCreateDto } from '../dto/response.dto';

@Injectable()
export class KitchenService {
  constructor(
    private databaseService: DatabaseService,
    @Inject('KAFKA_CLIENT') private kafkaService: ClientProxy,
  ) {}
  newOrder(order: number): OrderCreateDto {
    const foodRecipe = this.databaseService.getRecipeByCode(order);
    this.databaseService.statusOrder(foodRecipe.id, 'CREATE ORDER', order);
    this.kafkaService.emit('store-new-order', foodRecipe);
    return { message: 'CREATE ORDER' };
  }
}
