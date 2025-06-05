import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { IResponsibleRepository } from './responsible.repository';
import { CreateResponsibleDto } from '../dto/create-responsible.dto';
import { UpdateResponsibleDto } from '../dto/update-responsible.dto';
import { ResponsibleDetailDto } from '../dto/responsible-detail.dto';
import { PaginationQueryDto } from '../../common/pagination/pagination-query.dto';
import { ResponsiblePaginatedResponseDto } from '../dto/responsible-paginated-response.dto';

@Injectable()
export class PrismaResponsibleRepository implements IResponsibleRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CreateResponsibleDto): Promise<ResponsibleDetailDto> {
    return this.prisma.responsible.create({ data });
  }

  async list(
    query: PaginationQueryDto = {},
  ): Promise<ResponsiblePaginatedResponseDto> {
    const page = query.page ?? 1;
    const pageSize = query.pageSize ?? 10;
    const [nodes, count] = await this.prisma.$transaction([
      this.prisma.responsible.findMany({
        skip: (page - 1) * pageSize,
        take: pageSize,
        select: {
          id: true,
          name: true,
          email: true,
        },
      }),
      this.prisma.responsible.count(),
    ]);

    return {
      count,
      nodes,
      page,
      pageSize,
    };
  }

  findOne(id: number): Promise<ResponsibleDetailDto | null> {
    return this.prisma.responsible.findUnique({ where: { id } });
  }

  update(
    id: number,
    data: UpdateResponsibleDto,
  ): Promise<ResponsibleDetailDto> {
    return this.prisma.responsible.update({ where: { id }, data });
  }

  remove(id: number): Promise<ResponsibleDetailDto> {
    return this.prisma.responsible.delete({ where: { id } });
  }
}
