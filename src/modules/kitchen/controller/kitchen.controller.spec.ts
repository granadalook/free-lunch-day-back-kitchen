import { Test, TestingModule } from '@nestjs/testing';
import { KitchenController } from './kitchen.controller';
import { DatabaseService } from '../../database/service/database.service';
import { KitchenService } from '../service/kitchen.service';

describe('KitchenController', () => {
  let controller: KitchenController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KitchenController],
      providers: [
        DatabaseService,
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
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
