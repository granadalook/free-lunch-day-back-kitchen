export class OrderStatusDto {
  id: string;
  status: string;
  order?: number;
}
export class OrderCreateDto {
  message: string;
}
export class RecipeResultDto {
  codeOrder: number;
  recipe: RecipeDto;
  id: string;
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
