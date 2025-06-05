import {
  Controller,
  Get,
  Query,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { ResponsibleService } from './responsible.service';
import { CreateResponsibleDto } from './dto/create-responsible.dto';
import { UpdateResponsibleDto } from './dto/update-responsible.dto';
import { PaginationQueryDto } from '../common/pagination/pagination-query.dto';

@Controller('responsible')
export class ResponsibleController {
  constructor(private readonly responsibleService: ResponsibleService) {}

  @Post()
  create(@Body() dto: CreateResponsibleDto) {
    return this.responsibleService.create(dto);
  }

  @Get()
  list(@Query() query: PaginationQueryDto) {
    return this.responsibleService.list(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.responsibleService.findOne(Number(id));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateResponsibleDto) {
    return this.responsibleService.update(Number(id), dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.responsibleService.remove(Number(id));
  }
}
