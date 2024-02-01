import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { PrismaProductRepository } from './repository/implementations/prismaProduct.repository';
import { ProductRepository } from './repository/product.repository';

@Module({
  controllers: [ProductController],
  providers: [
    ProductService,
    { provide: ProductRepository, useClass: PrismaProductRepository },
  ],
})
export class ProductModule {}
