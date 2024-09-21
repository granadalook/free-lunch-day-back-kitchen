import {
  OrderStatusDto,
  RecipeResultDto,
} from 'src/modules/kitchen/dto/response.dto';
export const orderStatusMock: OrderStatusDto = {
  id: '1',
  status: 'CREATE',
  order: 1,
};

export const recipeResultMock: RecipeResultDto = {
  codeOrder: 1,
  recipe: {
    tomato: 1,
    lemon: 2,
    potato: 3,
  },
  id: '123',
};
