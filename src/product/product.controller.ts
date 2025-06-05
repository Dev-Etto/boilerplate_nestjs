import {
  Controller,
  Get,
  Query,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import {
  ApiTags,
  ApiResponse,
  ApiQuery,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
import { ProductService } from './service/product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductDetailDto } from './dto/product-detail.dto';
import { ProductPaginatedResponseDto } from './dto/product-paginated-response.dto';
import { PaginationQueryDto } from '../common/pagination/pagination-query.dto';

@ApiTags('product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @ApiBody({ type: CreateProductDto })
  @ApiResponse({
    status: 201,
    description: 'Produto criado',
    type: ProductDetailDto,
  })
  create(@Body() dto: CreateProductDto): Promise<ProductDetailDto> {
    return this.productService.create(dto);
  }

  @Get()
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Número da página',
  })
  @ApiQuery({
    name: 'pageSize',
    required: false,
    type: Number,
    description: 'Itens por página',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista paginada de produtos',
    type: ProductPaginatedResponseDto,
  })
  list(
    @Query() query: PaginationQueryDto,
  ): Promise<ProductPaginatedResponseDto> {
    return this.productService.list(query);
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID do produto',
  })
  @ApiResponse({
    status: 200,
    description: 'Detalhe do produto',
    type: ProductDetailDto,
  })
  findOne(@Param('id') id: string): Promise<ProductDetailDto | null> {
    return this.productService.findOne(Number(id));
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID do produto',
  })
  @ApiBody({ type: UpdateProductDto })
  @ApiResponse({
    status: 200,
    description: 'Produto atualizado',
    type: ProductDetailDto,
  })
  update(
    @Param('id') id: string,
    @Body() dto: UpdateProductDto,
  ): Promise<ProductDetailDto> {
    return this.productService.update(Number(id), dto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID do produto',
  })
  @ApiResponse({
    status: 200,
    description: 'Produto removido',
    type: ProductDetailDto,
  })
  remove(@Param('id') id: string): Promise<ProductDetailDto> {
    return this.productService.remove(Number(id));
  }
}
