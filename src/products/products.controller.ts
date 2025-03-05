import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  ConflictException,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('produtos')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    try {
      return await this.productsService.create(createProductDto);
    } catch (error) {
      if (error instanceof ConflictException) {
        throw new ConflictException(error.message);
      }
      throw error;
    }
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':codigo')
  findOne(@Param('codigo') codigo: string) {
    return this.productsService.findOne(codigo);
  }

  @Put(':codigo')
  update(
    @Param('codigo') codigo: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.update(codigo, updateProductDto);
  }

  @Delete(':codigo')
  remove(@Param('codigo') codigo: string) {
    return this.productsService.remove(codigo);
  }
}
