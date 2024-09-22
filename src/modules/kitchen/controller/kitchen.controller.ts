import { Controller, Param, Get, ParseIntPipe } from '@nestjs/common';
import { KitchenService } from '../service/kitchen.service';
import { DatabaseService } from '../../database/service/database.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { OrderStatusDto, OrderCreateDto } from '../dto/response.dto';
import { KafkaTopicsConstants } from '../../constants/kafka.topics';

@Controller('kitchen')
export class KitchenController {
  constructor(
    private kitchenService: KitchenService,
    private databaseService: DatabaseService,
  ) {}

  @Get('newOrder/:orderNum')
  newOrder(
    @Param('orderNum', ParseIntPipe) orderNum: number,
  ): Promise<OrderCreateDto> {
    return this.kitchenService.newOrder(orderNum);
  }

  @Get('orders')
  getOrders(): Array<OrderStatusDto> {
    return this.databaseService.getStatusList();
  }

  @MessagePattern(KafkaTopicsConstants.UPDATE_STATUS_TOPIC)
  async updateStatus(@Payload() payload: OrderStatusDto) {
    await this.databaseService.statusOrder(payload.id, payload.status);
  }
}
