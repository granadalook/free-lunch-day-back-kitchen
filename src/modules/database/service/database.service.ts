import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import {
  OrderStatusDto,
  RecipeResultDto,
} from '../../kitchen/dto/response.dto';

@Injectable()
export class DatabaseService {
  private statusList: { id: string; status: string; order: number }[] = [];
  getListFoods() {
    return [
      {
        code: 1,
        name: 'Ensalada',
        description:
          'Plato que se prepara mezclando distintos alimentos, crudos o cocidos',
      },
      {
        code: 2,
        name: 'Arroz con pollo',
        description:
          'Consiste en arroz cocinado con pollo, en presas o desmechado',
      },
      {
        code: 3,
        name: 'Carne guisada',
        description: 'Carne asada con varios condimentos',
      },
      {
        code: 4,
        name: 'Pure de papa',
        description: 'Patatas cocidas y molidas, asi como otros ingredientes',
      },
      {
        code: 5,
        name: 'Pollo en salsa',
        description: 'Pollo  en salsa roja',
      },
      {
        code: 6,
        name: 'Carne asada',
        description: 'carne elaborada barbacoa',
      },
    ];
  }
  getListRecipes() {
    return [
      {
        code: 1,
        recipe: {
          tomato: 3,
          onion: 2,
          lettuce: 1,
          lemon: 1,
        },
      },
      {
        code: 2,
        recipe: {
          chicken: 1,
          rice: 1,
          onion: 2,
        },
      },
      {
        code: 3,
        recipe: {
          meat: 1,
          onion: 1,
          potato: 2,
          ketchup: 1,
        },
      },
      {
        code: 4,
        recipe: {
          potato: 1,
          onion: 1,
          tomato: 1,
          cheese: 2,
        },
      },
      {
        code: 5,
        recipe: {
          ketchup: 1,
          onion: 2,
          tomato: 2,
          chicken: 1,
        },
      },
      {
        code: 6,
        recipe: {
          meat: 1,
          onion: 2,
          tomato: 2,
          ketchup: 1,
          potato: 2,
        },
      },
    ];
  }
  getRecipeByCode(codeOrder: number): RecipeResultDto | null {
    const recipes = this.getListRecipes();
    const recipeObject = recipes.find((recipe) => recipe.code === codeOrder);
    if (recipeObject) {
      return {
        codeOrder,
        recipe: recipeObject.recipe,
        id: uuidv4(),
      };
    }
    return null;
  }
  statusOrder(id: string, status: string, order?: number): void {
    const existingOrder = this.statusList.find((order) => order.id === id);
    if (existingOrder) {
      existingOrder.status = status;
    } else {
      this.statusList.push({ id, status, order });
    }
  }
  getStatusList(): Array<OrderStatusDto> {
    return this.statusList;
  }
}
