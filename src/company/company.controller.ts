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
import { CompanyService } from './service/company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { PaginationQueryDto } from '../common/pagination/pagination-query.dto';
import { CompanyDetailDto } from './dto/company-detail.dto';
import { CompanyPaginatedResponseDto } from './dto/company-paginated-response.dto';

@ApiTags('company')
@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  @ApiBody({ type: CreateCompanyDto })
  @ApiResponse({
    status: 201,
    description: 'Empresa criada',
    type: CompanyDetailDto,
  })
  create(@Body() dto: CreateCompanyDto): Promise<CompanyDetailDto> {
    return this.companyService.create(dto);
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
    description: 'Lista paginada de empresas',
    type: CompanyPaginatedResponseDto,
  })
  list(
    @Query() query: PaginationQueryDto,
  ): Promise<CompanyPaginatedResponseDto> {
    return this.companyService.list(query);
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID da empresa',
  })
  @ApiResponse({
    status: 200,
    description: 'Detalhe da empresa',
    type: CompanyDetailDto,
  })
  findOne(@Param('id') id: string): Promise<CompanyDetailDto | null> {
    return this.companyService.findOne(Number(id));
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID da empresa',
  })
  @ApiBody({ type: UpdateCompanyDto })
  @ApiResponse({
    status: 200,
    description: 'Empresa atualizada',
    type: CompanyDetailDto,
  })
  update(
    @Param('id') id: string,
    @Body() dto: UpdateCompanyDto,
  ): Promise<CompanyDetailDto> {
    return this.companyService.update(Number(id), dto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID da empresa',
  })
  @ApiResponse({
    status: 200,
    description: 'Empresa removida',
    type: CompanyDetailDto,
  })
  remove(@Param('id') id: string): Promise<CompanyDetailDto> {
    return this.companyService.remove(Number(id));
  }
}
