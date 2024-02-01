import { PrismaService } from 'src/database/prisma.service';
import { CreateProductDto } from '../../dto/create-product.dto';
import { Injectable } from '@nestjs/common';
import { UpdateProductDto } from '../../dto/update-product.dto';
import { ProductRepository } from '../product.repository';

@Injectable()
export class PrismaProductRepository implements ProductRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createProduct(data: CreateProductDto) {
    return await this.prisma.product.create({
      data,
    });
  }

  async findProductById(product_id: number) {
    return await this.prisma.product.findUnique({
      where: { product_id },
    });
  }

  async findAllProducts() {
    return await this.prisma.product.findMany();
  }

  async deleteProduct(product_id: number) {
    await this.prisma.product.delete({
      where: { product_id },
    });
  }

  async updateProduct(data: UpdateProductDto, product_id: number) {
    return await this.prisma.product.update({
      where: { product_id },
      data,
    });
  }
}
