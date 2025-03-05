import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { UpdateProductDto } from './dto/update-product.dto';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';

import { CreateProductDto } from './dto/create-product.dto';
import { ZodValidationPipe } from 'src/pipes/zod-validation.pipe';
import { CreateProductSchema, UpdateProductSchema } from './product.schema';

@ApiTags('produtos')
@Controller('produtos')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Criar um novo produto' })
  @ApiResponse({ status: 201, description: 'Produto criado com sucesso.' })
  @ApiResponse({ status: 400, description: 'Dados de entrada inválidos.' })
  @ApiResponse({
    status: 409,
    description: 'Já existe um produto com este código.',
  })
  @UsePipes(new ZodValidationPipe(CreateProductSchema))
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os produtos' })
  @ApiResponse({
    status: 200,
    description: 'Lista de produtos retornada com sucesso.',
  })
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':codigo')
  @ApiOperation({ summary: 'Buscar um produto pelo código' })
  @ApiResponse({ status: 200, description: 'Produto encontrado.' })
  @ApiResponse({ status: 404, description: 'Produto não encontrado.' })
  findOne(@Param('codigo') codigo: string) {
    return this.productsService.findOne(codigo);
  }

  @Put(':codigo')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Atualizar um produto existente' })
  @ApiResponse({ status: 200, description: 'Produto atualizado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Produto não encontrado.' })
  @ApiResponse({ status: 400, description: 'Dados de entrada inválidos.' })
  @UsePipes(new ZodValidationPipe(UpdateProductSchema))
  update(
    @Param('codigo') codigo: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.update(codigo, updateProductDto);
  }

  @Delete(':codigo')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Remover um produto' })
  @ApiResponse({ status: 200, description: 'Produto removido com sucesso.' })
  @ApiResponse({ status: 404, description: 'Produto não encontrado.' })
  remove(@Param('codigo') codigo: string) {
    return this.productsService.remove(codigo);
  }
}
