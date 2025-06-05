import { Module } from '@nestjs/common';
import { ResponsibleService } from './responsible.service';
import { ResponsibleController } from './responsible.controller';
import { PrismaResponsibleRepository } from './prisma-responsible.repository';

@Module({
  providers: [
    ResponsibleService,
    { provide: 'ResponsibleRepository', useClass: PrismaResponsibleRepository },
    PrismaResponsibleRepository,
  ],
  controllers: [ResponsibleController],
  exports: [ResponsibleService],
})
export class ResponsibleModule {}
