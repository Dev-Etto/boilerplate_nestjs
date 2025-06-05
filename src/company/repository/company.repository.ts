import { CreateCompanyDto } from '../dto/create-company.dto';
import { UpdateCompanyDto } from '../dto/update-company.dto';
import { CompanyDetailDto } from '../dto/company-detail.dto';
import { PaginationQueryDto } from '../../common/pagination/pagination-query.dto';
import { CompanyPaginatedResponseDto } from '../dto/company-paginated-response.dto';

export interface ICompanyRepository {
  create(data: CreateCompanyDto): Promise<CompanyDetailDto>;
  list(query?: PaginationQueryDto): Promise<CompanyPaginatedResponseDto>;
  findOne(id: number): Promise<CompanyDetailDto | null>;
  update(id: number, data: UpdateCompanyDto): Promise<CompanyDetailDto>;
  remove(id: number): Promise<CompanyDetailDto>;
}
