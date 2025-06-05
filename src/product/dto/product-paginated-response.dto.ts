import { ApiProperty } from '@nestjs/swagger';
import { ProductListDto } from './product-list.dto';
import { IsArray, IsInt } from 'class-validator';

export class ProductPaginatedResponseDto {
  @ApiProperty({ type: [ProductListDto] })
  @IsArray()
  nodes: ProductListDto[];

  @ApiProperty()
  @IsInt()
  count: number;

  @ApiProperty()
  @IsInt()
  page: number;

  @ApiProperty()
  @IsInt()
  pageSize: number;
}
