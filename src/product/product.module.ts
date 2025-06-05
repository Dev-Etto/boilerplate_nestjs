import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { PrismaProductRepository } from './prisma-product.repository';

@Module({
  providers: [
    ProductService,
    { provide: 'ProductRepository', useClass: PrismaProductRepository },
    PrismaProductRepository,
  ],
  controllers: [ProductController],
  exports: [ProductService],
})
export class ProductModule {}
