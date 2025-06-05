import { ApiProperty } from '@nestjs/swagger';
import { ResponsibleListDto } from './responsible-list.dto';
import { IsArray, IsInt } from 'class-validator';

export class ResponsiblePaginatedResponseDto {
  @ApiProperty({ type: [ResponsibleListDto] })
  @IsArray()
  nodes: ResponsibleListDto[];

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
