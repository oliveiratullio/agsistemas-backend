import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('produtos')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':codigo')
  @UseGuards(AuthGuard('jwt'))
  findOne(@Param('codigo') codigo: string) {
    return this.productsService.findOne(codigo);
  }

  @Put(':codigo')
  @UseGuards(AuthGuard('jwt'))
  update(
    @Param('codigo') codigo: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.update(codigo, updateProductDto);
  }

  @Delete(':codigo')
  @UseGuards(AuthGuard('jwt'))
  remove(@Param('codigo') codigo: string) {
    return this.productsService.remove(codigo);
  }
}
