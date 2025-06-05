import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export class PaginationQueryDto {
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  page?: number = 1;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  pageSize?: number = 10;
}
