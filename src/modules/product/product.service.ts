import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductRepository } from './repository/product.repository';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}
  async create(data: CreateProductDto) {
    return await this.productRepository.createProduct(data);
  }

  async findAll() {
    return await this.productRepository.findAllProducts();
  }

  async findOne(id: number) {
    const product = await this.productRepository.findProductById(id);
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.productRepository.findProductById(id);
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return await this.productRepository.updateProduct(updateProductDto, id);
  }

  async remove(id: number) {
    const product = await this.productRepository.findProductById(id);
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }
}
