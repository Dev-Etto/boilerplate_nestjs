import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export class PaginationQueryDto {
  @ApiProperty()
  @IsNumber()
  @IsOptional()
  page?: number = 1;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  pageSize?: number = 10;
}
