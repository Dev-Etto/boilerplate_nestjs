import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { PrismaCompanyRepository } from './prisma-company.repository';

@Module({
  providers: [
    CompanyService,
    { provide: 'CompanyRepository', useClass: PrismaCompanyRepository },
    PrismaCompanyRepository,
  ],
  controllers: [CompanyController],
  exports: [CompanyService],
})
export class CompanyModule {}
