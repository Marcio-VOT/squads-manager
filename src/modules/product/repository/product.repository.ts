import { Product } from '@prisma/client';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';

export abstract class ProductRepository {
  abstract createProduct(data: CreateProductDto): Promise<Product>;
  abstract findProductById(product_id: number): Promise<Product>;
  abstract findAllProducts(): Promise<Product[]>;
  abstract deleteProduct(product_id: number): Promise<void>;
  abstract updateProduct(
    data: UpdateProductDto,
    product_id: number,
  ): Promise<Product>;
}
