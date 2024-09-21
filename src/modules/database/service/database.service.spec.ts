import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseService } from './database.service';
import { v4 as uuidv4 } from 'uuid';
jest.mock('uuid', () => ({
  v4: jest.fn(),
}));

describe('DatabaseService', () => {
  let service: DatabaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DatabaseService],
    }).compile();

    service = module.get<DatabaseService>(DatabaseService);
    service.statusList = [];
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should return an array of foods', () => {
    const result = service.getListFoods();
    expect(result).toHaveLength(6);
    expect(result[0]).toEqual({
      code: 1,
      name: 'Ensalada',
      description:
        'Plato que se prepara mezclando distintos alimentos, crudos o cocidos',
    });
    expect(result[1].code).toBe(2);
    expect(result[1].name).toBe('Arroz con pollo');
  });
  it('should return an array of recipes', () => {
    const result = service.getListRecipes();
    expect(result).toHaveLength(6);
    expect(result[0]).toEqual({
      code: 1,
      recipe: {
        tomato: 3,
        onion: 2,
        lettuce: 1,
        lemon: 1,
      },
    });
    expect(result[2]).toEqual({
      code: 3,
      recipe: {
        meat: 1,
        onion: 1,
        potato: 2,
        ketchup: 1,
      },
    });
    expect(result[5].recipe).toHaveProperty('meat', 1);
    expect(result[5].recipe).toHaveProperty('onion', 2);
    expect(result[5].recipe).toHaveProperty('ketchup', 1);
  });
  it('should return a recipe by code', () => {
    const mockUuid = '123e4567-e89b-12d3-a456-426614174000';
    (uuidv4 as jest.Mock).mockReturnValue(mockUuid);

    const result = service.getRecipeByCode(1);

    expect(result).toEqual({
      codeOrder: 1,
      recipe: {
        tomato: 3,
        onion: 2,
        lettuce: 1,
        lemon: 1,
      },
      id: mockUuid,
    });
  });

  it('should return null if no recipe is found for the given code', () => {
    const result = service.getRecipeByCode(999);
    expect(result).toBeNull();
  });
  it('should update status of an existing order', () => {
    service.statusList = [{ id: '1', status: 'Pending', order: 100 }];
    service.statusOrder('1', 'Completed');
    expect(service.statusList[0]).toEqual({
      id: '1',
      status: 'Completed',
      order: 100,
    });
  });

  it('should add a new order if it does not exist', () => {
    service.statusOrder('2', 'In Progress', 200);
    expect(service.statusList).toHaveLength(1);
    expect(service.statusList[0]).toEqual({
      id: '2',
      status: 'In Progress',
      order: 200,
    });
  });

  it('should add a new order without order number if not provided', () => {
    service.statusOrder('3', 'In Progress');
    expect(service.statusList).toHaveLength(1);
    expect(service.statusList[0]).toEqual({
      id: '3',
      status: 'In Progress',
      order: undefined,
    });
  });
  it('should return an empty array when no orders are present', () => {
    const result = service.getStatusList();
    expect(result).toHaveLength(0);
    expect(result).toEqual([]);
  });

  it('should return the list of orders', () => {
    service.statusList = [
      { id: '1', status: 'Pending', order: 100 },
      { id: '2', status: 'In Progress', order: 200 },
    ];

    const result = service.getStatusList();
    expect(result).toHaveLength(2);
    expect(result).toEqual([
      { id: '1', status: 'Pending', order: 100 },
      { id: '2', status: 'In Progress', order: 200 },
    ]);
  });
});
