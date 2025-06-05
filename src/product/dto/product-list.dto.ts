import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, IsNumber } from 'class-validator';

export class ProductListDto {
  @ApiProperty()
  @IsInt()
  id: number;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNumber()
  price: number;
}
