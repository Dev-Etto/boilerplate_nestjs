import { Injectable, Inject } from '@nestjs/common';
import { IProductRepository } from '../repository/product.repository';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { ProductDetailDto } from '../dto/product-detail.dto';
import { PaginationQueryDto } from '../../common/pagination/pagination-query.dto';
import { ProductPaginatedResponseDto } from '../dto/product-paginated-response.dto';

@Injectable()
export class ProductService {
  constructor(
    @Inject('ProductRepository')
    private readonly repository: IProductRepository,
  ) {}

  create(data: CreateProductDto): Promise<ProductDetailDto> {
    return this.repository.create(data);
  }

  list(query?: PaginationQueryDto): Promise<ProductPaginatedResponseDto> {
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
