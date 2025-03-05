import { ApiProperty } from '@nestjs/swagger';

export class UpdateProductDto {
  @ApiProperty({
    description: 'Nome do produto',
    example: 'Notebook Dell',
    required: false,
  })
  nome?: string;

  @ApiProperty({
    description: 'Código de barras do produto',
    example: '1234567890123',
    required: false,
  })
  codigo_barras?: string;

  @ApiProperty({
    description: 'Quantidade em estoque',
    example: 15,
    required: false,
  })
  quantidade?: number;

  @ApiProperty({
    description: 'Preço do produto',
    example: 3499.99,
    required: false,
  })
  preco?: number;
}
