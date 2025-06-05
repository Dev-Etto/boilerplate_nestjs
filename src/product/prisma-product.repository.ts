import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { IProductRepository } from './product.repository';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductListDto } from './dto/product-list.dto';
import { ProductDetailDto } from './dto/product-detail.dto';
import { PaginationResultDto } from '../common/pagination/pagination-result.dto';
import { PaginationQueryDto } from '../common/pagination/pagination-query.dto';

@Injectable()
export class PrismaProductRepository implements IProductRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CreateProductDto): Promise<ProductDetailDto> {
    return this.prisma.product.create({ data });
  }

  async list(
    query: PaginationQueryDto = {},
  ): Promise<PaginationResultDto<ProductListDto>> {
    const page = query.page ?? 1;
    const pageSize = query.pageSize ?? 10;
    const [nodes, count] = await this.prisma.$transaction([
      this.prisma.product.findMany({
        skip: (page - 1) * pageSize,
        take: pageSize,
        select: {
          id: true,
          name: true,
          price: true,
        },
      }),
      this.prisma.product.count(),
    ]);
    return new PaginationResultDto(nodes, count, page, pageSize);
  }

  findOne(id: number): Promise<ProductDetailDto | null> {
    return this.prisma.product.findUnique({ where: { id } });
  }

  update(id: number, data: UpdateProductDto): Promise<ProductDetailDto> {
    return this.prisma.product.update({ where: { id }, data });
  }

  remove(id: number): Promise<ProductDetailDto> {
    return this.prisma.product.delete({ where: { id } });
  }
}
