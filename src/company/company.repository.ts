import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { CompanyListDto } from './dto/company-list.dto';
import { CompanyDetailDto } from './dto/company-detail.dto';
import { PaginationResultDto } from '../common/pagination/pagination-result.dto';
import { PaginationQueryDto } from '../common/pagination/pagination-query.dto';

export interface ICompanyRepository {
  create(data: CreateCompanyDto): Promise<CompanyDetailDto>;
  list(
    query?: PaginationQueryDto,
  ): Promise<PaginationResultDto<CompanyListDto>>;
  findOne(id: number): Promise<CompanyDetailDto | null>;
  update(id: number, data: UpdateCompanyDto): Promise<CompanyDetailDto>;
  remove(id: number): Promise<CompanyDetailDto>;
}
