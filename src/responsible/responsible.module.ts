import { Module } from '@nestjs/common';
import { ResponsibleService } from './service/responsible.service';
import { ResponsibleController } from './responsible.controller';
import { PrismaResponsibleRepository } from './repository/prisma-responsible.repository';
import { PrismaService } from '../prisma.service';

@Module({
  providers: [
    ResponsibleService,
    { provide: 'ResponsibleRepository', useClass: PrismaResponsibleRepository },
    PrismaResponsibleRepository,
    PrismaService,
  ],
  controllers: [ResponsibleController],
  exports: [ResponsibleService],
})
export class ResponsibleModule {}
