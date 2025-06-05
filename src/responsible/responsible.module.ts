import { Module } from '@nestjs/common';
import { ResponsibleService } from './responsible.service';
import { ResponsibleController } from './responsible.controller';

@Module({
  providers: [ResponsibleService],
  controllers: [ResponsibleController]
})
export class ResponsibleModule {}
