import { Injectable, Inject } from '@nestjs/common';
import { ICompanyRepository } from '../repository/company.repository';
import { CreateCompanyDto } from '../dto/create-company.dto';
import { UpdateCompanyDto } from '../dto/update-company.dto';
import { CompanyDetailDto } from '../dto/company-detail.dto';
import { PaginationQueryDto } from '../../common/pagination/pagination-query.dto';
import { CompanyPaginatedResponseDto } from '../dto/company-paginated-response.dto';

@Injectable()
export class CompanyService {
  constructor(
    @Inject('CompanyRepository')
    private readonly repository: ICompanyRepository,
  ) {}

  create(data: CreateCompanyDto): Promise<CompanyDetailDto> {
    return this.repository.create(data);
  }

  list(query?: PaginationQueryDto): Promise<CompanyPaginatedResponseDto> {
    return this.repository.list(query);
  }

  findOne(id: number): Promise<CompanyDetailDto | null> {
    return this.repository.findOne(id);
  }

  update(id: number, data: UpdateCompanyDto): Promise<CompanyDetailDto> {
    return this.repository.update(id, data);
  }

  remove(id: number): Promise<CompanyDetailDto> {
    return this.repository.remove(id);
  }
}
