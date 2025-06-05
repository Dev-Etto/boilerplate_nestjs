import { Injectable, Inject } from '@nestjs/common';
import { IResponsibleRepository } from './responsible.repository';
import { CreateResponsibleDto } from './dto/create-responsible.dto';
import { UpdateResponsibleDto } from './dto/update-responsible.dto';
import { ResponsibleListDto } from './dto/responsible-list.dto';
import { ResponsibleDetailDto } from './dto/responsible-detail.dto';
import { PaginationResultDto } from '../common/pagination/pagination-result.dto';
import { PaginationQueryDto } from '../common/pagination/pagination-query.dto';

@Injectable()
export class ResponsibleService {
  constructor(
    @Inject('ResponsibleRepository')
    private readonly repository: IResponsibleRepository,
  ) {}

  create(data: CreateResponsibleDto): Promise<ResponsibleDetailDto> {
    return this.repository.create(data);
  }

  list(
    query?: PaginationQueryDto,
  ): Promise<PaginationResultDto<ResponsibleListDto>> {
    return this.repository.list(query);
  }

  findOne(id: number): Promise<ResponsibleDetailDto | null> {
    return this.repository.findOne(id);
  }

  update(
    id: number,
    data: UpdateResponsibleDto,
  ): Promise<ResponsibleDetailDto> {
    return this.repository.update(id, data);
  }

  remove(id: number): Promise<ResponsibleDetailDto> {
    return this.repository.remove(id);
  }
}
