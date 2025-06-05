import { CreateResponsibleDto } from '../dto/create-responsible.dto';
import { UpdateResponsibleDto } from '../dto/update-responsible.dto';
import { ResponsibleDetailDto } from '../dto/responsible-detail.dto';
import { PaginationQueryDto } from '../../common/pagination/pagination-query.dto';
import { ResponsiblePaginatedResponseDto } from '../dto/responsible-paginated-response.dto';

export interface IResponsibleRepository {
  create(data: CreateResponsibleDto): Promise<ResponsibleDetailDto>;
  list(query?: PaginationQueryDto): Promise<ResponsiblePaginatedResponseDto>;
  findOne(id: number): Promise<ResponsibleDetailDto | null>;
  update(id: number, data: UpdateResponsibleDto): Promise<ResponsibleDetailDto>;
  remove(id: number): Promise<ResponsibleDetailDto>;
}
