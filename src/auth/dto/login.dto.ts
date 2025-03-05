import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    description: 'Nome de usuário',
    example: 'admin',
  })
  username: string;

  @ApiProperty({ description: 'Senha do usuário', example: 'senha123' })
  password: string;
}
