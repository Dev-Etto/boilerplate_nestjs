import { Injectable, Inject } from '@nestjs/common';
import { IProductRepository } from './product.repository';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductListDto } from './dto/product-list.dto';
import { ProductDetailDto } from './dto/product-detail.dto';
import { PaginationResultDto } from '../common/pagination/pagination-result.dto';
import { PaginationQueryDto } from '../common/pagination/pagination-query.dto';

@Injectable()
export class ProductService {
  constructor(
    @Inject('ProductRepository')
    private readonly repository: IProductRepository,
  ) {}

  create(data: CreateProductDto): Promise<ProductDetailDto> {
    return this.repository.create(data);
  }

  list(
    query?: PaginationQueryDto,
  ): Promise<PaginationResultDto<ProductListDto>> {
    return this.repository.list(query);
  }

  findOne(id: number): Promise<ProductDetailDto | null> {
    return this.repository.findOne(id);
  }

  update(id: number, data: UpdateProductDto): Promise<ProductDetailDto> {
    return this.repository.update(id, data);
  }

  remove(id: number): Promise<ProductDetailDto> {
    return this.repository.remove(id);
  }
}
