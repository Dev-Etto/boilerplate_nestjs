import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, IsNumber } from 'class-validator';

export class ProductDetailDto {
  @ApiProperty()
  @IsInt()
  id: number;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNumber()
  price: number;

  @ApiProperty()
  @IsInt()
  companyId: number;
}
