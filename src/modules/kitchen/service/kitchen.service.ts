import { Injectable, Inject } from '@nestjs/common';
import { DatabaseService } from 'src/modules/database/service/database.service';
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
  newOrder(order: number): OrderCreateDto {
    const foodRecipe = this.databaseService.getRecipeByCode(order);
    this.databaseService.statusOrder(
      foodRecipe.id,
      StatusOrderEnum.CREATE_ORDER,
      order,
    );
    this.kafkaService.emit(KafkaTopicsConstants.CREATE_ORDER_TOPIC, foodRecipe);
    return { message: StatusOrderEnum.CREATE_ORDER };
  }
}
