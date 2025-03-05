import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const existingProduct = await this.productRepository.findOne({
      where: { codigo: createProductDto.codigo },
    });

    if (existingProduct) {
      throw new ConflictException('Já existe um produto com este código.');
    }
    const product = this.productRepository.create(createProductDto);
    return this.productRepository.save(product);
  }

  async findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async findOne(codigo: string): Promise<Product> {
    return this.productRepository.findOne({ where: { codigo } });
  }

  async update(
    codigo: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const product = await this.productRepository.findOne({ where: { codigo } });
    if (!product) {
      throw new Error('Produto não encontrado.');
    }
    Object.assign(product, updateProductDto);
    return this.productRepository.save(product);
  }

  async remove(codigo: string): Promise<void> {
    const product = await this.productRepository.findOne({ where: { codigo } });
    if (!product) {
      throw new Error('Produto não encontrado.');
    }
    await this.productRepository.remove(product);
  }
}
