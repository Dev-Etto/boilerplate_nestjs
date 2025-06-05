import { Module } from '@nestjs/common';
import { ProductService } from './service/product.service';
import { ProductController } from './product.controller';
import { PrismaProductRepository } from './repository/prisma-product.repository';
import { PrismaService } from '../prisma.service';

@Module({
  providers: [
    ProductService,
    { provide: 'ProductRepository', useClass: PrismaProductRepository },
    PrismaProductRepository,
    PrismaService,
  ],
  controllers: [ProductController],
  exports: [ProductService],
})
export class ProductModule {}
