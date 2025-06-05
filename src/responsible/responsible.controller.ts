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
import { ResponsibleService } from './service/responsible.service';
import { CreateResponsibleDto } from './dto/create-responsible.dto';
import { UpdateResponsibleDto } from './dto/update-responsible.dto';
import { PaginationQueryDto } from '../common/pagination/pagination-query.dto';
import { ResponsibleDetailDto } from './dto/responsible-detail.dto';
import { ResponsiblePaginatedResponseDto } from './dto/responsible-paginated-response.dto';

@ApiTags('responsible')
@Controller('responsible')
export class ResponsibleController {
  constructor(private readonly responsibleService: ResponsibleService) {}

  @Post()
  @ApiBody({ type: CreateResponsibleDto })
  @ApiResponse({
    status: 201,
    description: 'Responsável criado',
    type: ResponsibleDetailDto,
  })
  create(@Body() dto: CreateResponsibleDto): Promise<ResponsibleDetailDto> {
    return this.responsibleService.create(dto);
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
    description: 'Lista paginada de responsáveis',
    type: ResponsiblePaginatedResponseDto,
  })
  list(
    @Query() query: PaginationQueryDto,
  ): Promise<ResponsiblePaginatedResponseDto> {
    return this.responsibleService.list(query);
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID do responsável',
  })
  @ApiResponse({
    status: 200,
    description: 'Detalhe do responsável',
    type: ResponsibleDetailDto,
  })
  findOne(@Param('id') id: string): Promise<ResponsibleDetailDto | null> {
    return this.responsibleService.findOne(Number(id));
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID do responsável',
  })
  @ApiBody({ type: UpdateResponsibleDto })
  @ApiResponse({
    status: 200,
    description: 'Responsável atualizado',
    type: ResponsibleDetailDto,
  })
  update(
    @Param('id') id: string,
    @Body() dto: UpdateResponsibleDto,
  ): Promise<ResponsibleDetailDto> {
    return this.responsibleService.update(Number(id), dto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID do responsável',
  })
  @ApiResponse({
    status: 200,
    description: 'Responsável removido',
    type: ResponsibleDetailDto,
  })
  remove(@Param('id') id: string): Promise<ResponsibleDetailDto> {
    return this.responsibleService.remove(Number(id));
  }
}
