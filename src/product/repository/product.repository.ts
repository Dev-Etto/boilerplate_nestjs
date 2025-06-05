import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { ProductDetailDto } from '../dto/product-detail.dto';
import { PaginationQueryDto } from '../../common/pagination/pagination-query.dto';
import { ProductPaginatedResponseDto } from '../dto/product-paginated-response.dto';

export interface IProductRepository {
  create(data: CreateProductDto): Promise<ProductDetailDto>;
  list(query?: PaginationQueryDto): Promise<ProductPaginatedResponseDto>;
  findOne(id: number): Promise<ProductDetailDto | null>;
  update(id: number, data: UpdateProductDto): Promise<ProductDetailDto>;
  remove(id: number): Promise<ProductDetailDto>;
}
