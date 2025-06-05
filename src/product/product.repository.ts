import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductListDto } from './dto/product-list.dto';
import { ProductDetailDto } from './dto/product-detail.dto';
import { PaginationResultDto } from '../common/pagination/pagination-result.dto';
import { PaginationQueryDto } from '../common/pagination/pagination-query.dto';

export interface IProductRepository {
  create(data: CreateProductDto): Promise<ProductDetailDto>;
  list(
    query?: PaginationQueryDto,
  ): Promise<PaginationResultDto<ProductListDto>>;
  findOne(id: number): Promise<ProductDetailDto | null>;
  update(id: number, data: UpdateProductDto): Promise<ProductDetailDto>;
  remove(id: number): Promise<ProductDetailDto>;
}
