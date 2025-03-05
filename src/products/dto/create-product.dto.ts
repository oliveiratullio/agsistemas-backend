import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ description: 'Código do produto', example: 'PROD001' })
  codigo: string;

  @ApiProperty({ description: 'Nome do produto', example: 'Notebook Dell' })
  nome: string;

  @ApiProperty({
    description: 'Código de barras do produto',
    example: '1234567890123',
    required: false,
  })
  codigo_barras?: string;

  @ApiProperty({ description: 'Quantidade em estoque', example: 10 })
  quantidade: number;

  @ApiProperty({ description: 'Preço do produto', example: 2999.99 })
  preco: number;
}
