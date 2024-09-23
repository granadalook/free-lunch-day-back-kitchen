export class Food {
  code: number;
  name: string;
  description: string;
}

export class RecipeDto {
  tomato?: number;
  lemon?: number;
  potato?: number;
  rice?: number;
  ketchup?: number;
  lettuce?: number;
  onion?: number;
  cheese?: number;
  meat?: number;
  chicken?: number;
}

export class Recipe {
  code: number;
  recipe: RecipeDto;
}
