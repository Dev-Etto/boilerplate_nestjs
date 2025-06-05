import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { ICompanyRepository } from './company.repository';
import { CreateCompanyDto } from '../dto/create-company.dto';
import { UpdateCompanyDto } from '../dto/update-company.dto';
import { CompanyDetailDto } from '../dto/company-detail.dto';
import { PaginationQueryDto } from '../../common/pagination/pagination-query.dto';
import { CompanyPaginatedResponseDto } from '../dto/company-paginated-response.dto';

@Injectable()
export class PrismaCompanyRepository implements ICompanyRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CreateCompanyDto): Promise<CompanyDetailDto> {
    return this.prisma.company.create({
      data,
      include: {
        responsible: true,
        products: true,
      },
    });
  }

  async list(
    query: PaginationQueryDto = {},
  ): Promise<CompanyPaginatedResponseDto> {
    const page = query.page ?? 1;
    const pageSize = query.pageSize ?? 10;
    const [nodes, count] = await this.prisma.$transaction([
      this.prisma.company.findMany({
        skip: (page - 1) * pageSize,
        take: pageSize,
        select: {
          id: true,
          name: true,
        },
      }),
      this.prisma.company.count(),
    ]);
    return { count, nodes, page, pageSize };
  }

  findOne(id: number): Promise<CompanyDetailDto | null> {
    return this.prisma.company.findUnique({
      where: { id },
      include: {
        responsible: true,
        products: true,
      },
    });
  }

  update(id: number, data: UpdateCompanyDto): Promise<CompanyDetailDto> {
    return this.prisma.company.update({
      where: { id },
      data,
      include: {
        responsible: true,
        products: true,
      },
    });
  }

  remove(id: number): Promise<CompanyDetailDto> {
    return this.prisma.company.delete({
      where: { id },
      include: {
        responsible: true,
        products: true,
      },
    });
  }
}
