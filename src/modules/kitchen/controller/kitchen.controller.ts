import { Controller, Param, Get, BadRequestException } from '@nestjs/common';
import { KitchenService } from '../service/kitchen.service';
import { DatabaseService } from 'src/modules/database/service/database.service';

@Controller('kitchen')
export class KitchenController {
  constructor(
    private kitchenService: KitchenService,
    private databaseService: DatabaseService,
  ) {}

  @Get('newOrder/:orderNum')
  newOrder(@Param('orderNum') orderNum: string) {
    const orderNumber = parseInt(orderNum, 10);
    if (isNaN(orderNumber)) {
      throw new BadRequestException('Invalid order number');
    }
    return this.kitchenService.newOrder(orderNumber);
  }

  @Get('orders')
  getOrders() {
    return this.databaseService.getStatusList();
  }
}
