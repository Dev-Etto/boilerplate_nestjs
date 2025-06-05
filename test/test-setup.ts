import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import * as request from 'supertest';
import { CompanyDetailDto } from 'src/company/dto/company-detail.dto';

export async function createTestApp(): Promise<INestApplication> {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();
  const app = moduleFixture.createNestApplication();
  app.useGlobalPipes(new ValidationPipe());
  await app.init();
  return app;
}

export async function createCompany(
  app: INestApplication,
  name = 'Empresa Teste',
): Promise<number> {
  const res = await request(
    app.getHttpServer() as unknown as import('http').Server,
  )
    .post('/company')
    .send({ name });

  const body = res.body as CompanyDetailDto;

  return body.id;
}
