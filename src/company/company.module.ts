import { Module } from '@nestjs/common';
import { CompanyService } from './service/company.service';
import { CompanyController } from './company.controller';
import { PrismaCompanyRepository } from './repository/prisma-company.repository';
import { PrismaService } from '../prisma.service';

@Module({
  providers: [
    CompanyService,
    { provide: 'CompanyRepository', useClass: PrismaCompanyRepository },
    PrismaCompanyRepository,
    PrismaService,
  ],
  controllers: [CompanyController],
  exports: [CompanyService],
})
export class CompanyModule {}
