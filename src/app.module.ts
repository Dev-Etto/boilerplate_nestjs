import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CompanyModule } from './company/company.module';
import { ResponsibleModule } from './responsible/responsible.module';
import { ProductModule } from './product/product.module';
import { PrismaService } from './prisma.service';

@Module({
  imports: [CompanyModule, ResponsibleModule, ProductModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
