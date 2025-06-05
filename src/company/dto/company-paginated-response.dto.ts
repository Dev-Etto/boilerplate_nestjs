import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsInt } from 'class-validator';
import { CompanyListDto } from './company-list.dto';

export class CompanyPaginatedResponseDto {
  @ApiProperty({ type: [CompanyListDto] })
  @IsArray()
  nodes: CompanyListDto[];

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
