import { Module } from '@nestjs/common';
import { CompanyModule } from './company/company.module';
import { ResponsibleModule } from './responsible/responsible.module';
import { ProductModule } from './product/product.module';
import { PrismaService } from './prisma.service';

@Module({
  imports: [CompanyModule, ResponsibleModule, ProductModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
