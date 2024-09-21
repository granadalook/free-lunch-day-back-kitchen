import { Test, TestingModule } from '@nestjs/testing';
import { KitchenController } from './kitchen.controller';
import { DatabaseService } from '../../database/service/database.service';
import { KitchenService } from '../service/kitchen.service';
import { orderStatusMock, recipeResultMock } from '../../../../test/mock.data';

describe('KitchenController', () => {
  let controller: KitchenController;
  let databaseService: DatabaseService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KitchenController],
      providers: [
        {
          provide: DatabaseService,
          useValue: {
            getStatusList: jest.fn().mockReturnValue([orderStatusMock]),
            getRecipeByCode: jest.fn().mockReturnValue(recipeResultMock),
            statusOrder: jest.fn().mockReturnValue(true),
          },
        },
        KitchenService,
        {
          provide: 'KAFKA_CLIENT',
          useValue: {
            emit: jest.fn(() => {
              return 'created';
            }),
          },
        },
      ],
    }).compile();

    controller = module.get<KitchenController>(KitchenController);
    databaseService = module.get<DatabaseService>(DatabaseService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('newOrder', async () => {
    const resp = await controller.newOrder(1);
    expect(resp).toEqual({ message: 'CREATE ORDER' });
  });
  it('should return an array of OrderStatusDto', () => {
    expect(controller.getOrders()).toEqual([orderStatusMock]);
    expect(databaseService.getStatusList).toHaveBeenCalled();
  });
  it('should update order status and return result', async () => {
    const result = await controller.updateStatus(orderStatusMock);
    expect(databaseService.statusOrder).toHaveBeenCalledWith(
      orderStatusMock.id,
      orderStatusMock.status,
    );
    expect(result).toBe(true);
  });
});
