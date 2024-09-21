import { Controller, Param, Get, ParseIntPipe } from '@nestjs/common';
import { KitchenService } from '../service/kitchen.service';
import { DatabaseService } from 'src/modules/database/service/database.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { OrderStatusDto } from '../dto/response.dto';

@Controller('kitchen')
export class KitchenController {
  constructor(
    private kitchenService: KitchenService,
    private databaseService: DatabaseService,
  ) {}

  @Get('newOrder/:orderNum')
  newOrder(@Param('orderNum', ParseIntPipe) orderNum: number) {
    return this.kitchenService.newOrder(orderNum);
  }

  @Get('orders')
  getOrders(): Array<OrderStatusDto> {
    return this.databaseService.getStatusList();
  }

  @MessagePattern('update-status-order')
  updateStatus(@Payload() payload: OrderStatusDto) {
    return this.databaseService.statusOrder(payload.id, payload.status);
  }
}
