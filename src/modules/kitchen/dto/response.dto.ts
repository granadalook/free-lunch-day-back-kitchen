import { ApiProperty } from '@nestjs/swagger';

export class RecipeDto {
  @ApiProperty({ description: 'Cantidad de tomate', required: false })
  tomato?: number;

  @ApiProperty({ description: 'Cantidad de limón', required: false })
  lemon?: number;

  @ApiProperty({ description: 'Cantidad de papa', required: false })
  potato?: number;

  @ApiProperty({ description: 'Cantidad de arroz', required: false })
  rice?: number;

  @ApiProperty({ description: 'Cantidad de ketchup', required: false })
  ketchup?: number;

  @ApiProperty({ description: 'Cantidad de lechuga', required: false })
  lettuce?: number;

  @ApiProperty({ description: 'Cantidad de cebolla', required: false })
  onion?: number;

  @ApiProperty({ description: 'Cantidad de queso', required: false })
  cheese?: number;

  @ApiProperty({ description: 'Cantidad de carne', required: false })
  meat?: number;

  @ApiProperty({ description: 'Cantidad de pollo', required: false })
  chicken?: number;
}

export class OrderStatusDto {
  @ApiProperty({ description: 'ID del pedido', example: 'uuid' })
  id: string;

  @ApiProperty({
    description: 'Estado del pedido',
    examples: ['IN PROGREST', 'DELIVERED', 'CREATE ORDER'],
  })
  status: string;

  @ApiProperty({
    description: 'Número de orden',
    required: false,
    examples: ['1', '2', '3', '4', '5', '6'],
  })
  order?: number;
}

export class OrderCreateDto {
  @ApiProperty({
    description: 'Mensaje de respuesta al crear un pedido',
    example: 'CREATE ORDER',
  })
  message: string;
}

export class RecipeResultDto {
  @ApiProperty({ description: 'Código del pedido', example: '1' })
  codeOrder: number;

  @ApiProperty({ description: 'Receta asociada al pedido' })
  recipe: RecipeDto;

  @ApiProperty({ description: 'ID único de la receta' })
  id: string;
}
