import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString } from 'class-validator';
import { ProductListDto } from 'src/product/dto/product-list.dto';
import { ResponsibleDetailDto } from 'src/responsible/dto/responsible-detail.dto';

export class CompanyDetailDto {
  @ApiProperty()
  @IsInt()
  id: number;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty({ type: () => ResponsibleDetailDto, nullable: true })
  @IsOptional()
  responsible?: ResponsibleDetailDto | null;

  @ApiProperty({ type: () => [ProductListDto] })
  products: ProductListDto[];
}
