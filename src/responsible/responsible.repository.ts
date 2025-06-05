import { CreateResponsibleDto } from './dto/create-responsible.dto';
import { UpdateResponsibleDto } from './dto/update-responsible.dto';
import { ResponsibleListDto } from './dto/responsible-list.dto';
import { ResponsibleDetailDto } from './dto/responsible-detail.dto';
import { PaginationResultDto } from '../common/pagination/pagination-result.dto';
import { PaginationQueryDto } from '../common/pagination/pagination-query.dto';

export interface IResponsibleRepository {
  create(data: CreateResponsibleDto): Promise<ResponsibleDetailDto>;
  list(
    query?: PaginationQueryDto,
  ): Promise<PaginationResultDto<ResponsibleListDto>>;
  findOne(id: number): Promise<ResponsibleDetailDto | null>;
  update(id: number, data: UpdateResponsibleDto): Promise<ResponsibleDetailDto>;
  remove(id: number): Promise<ResponsibleDetailDto>;
}
