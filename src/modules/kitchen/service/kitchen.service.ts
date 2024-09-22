import { Injectable, Inject } from '@nestjs/common';
import { DatabaseService } from '../../database/service/database.service';
import { ClientProxy } from '@nestjs/microservices';
import { OrderCreateDto } from '../dto/response.dto';
import { KafkaTopicsConstants } from '../../constants/kafka.topics';
import { StatusOrderEnum } from '../../constants/status.order.enum';

@Injectable()
export class KitchenService {
  constructor(
    private databaseService: DatabaseService,
    @Inject('KAFKA_CLIENT') private kafkaService: ClientProxy,
  ) {}
  async newOrder(order: number): Promise<OrderCreateDto> {
    const foodRecipe = await this.databaseService.getRecipeByCode(order);
    await this.databaseService.statusOrder(
      foodRecipe.id,
      StatusOrderEnum.CREATE_ORDER,
      order,
    );
    await this.kafkaService.emit(
      KafkaTopicsConstants.CREATE_ORDER_TOPIC,
      foodRecipe,
    );
    return { message: StatusOrderEnum.CREATE_ORDER };
  }
}
