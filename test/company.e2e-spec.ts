import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { CompanyPaginatedResponseDto } from '../src/company/dto/company-paginated-response.dto';
import { CompanyDetailDto } from '../src/company/dto/company-detail.dto';
import { createTestApp, createCompany } from './test-setup';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

describe('CompanyController (e2e)', () => {
  let app: INestApplication;
  let companyId: number;

  beforeAll(async () => {
    app = await createTestApp();
    companyId = await createCompany(app, 'Empresa Teste');
  });

  afterAll(async () => {
    await app.close();
  });

  async function assertValidDto<T extends object>(
    cls: new () => T,
    data: any,
  ): Promise<T> {
    const instance = plainToInstance(cls, data);
    const errors = await validate(instance as object);
    expect(errors).toHaveLength(0);
    return instance;
  }

  it('/company (POST)', async () => {
    const res = await request(
      app.getHttpServer() as unknown as import('http').Server,
    )
      .post('/company')
      .send({ name: 'Empresa Teste' })
      .expect(201);

    const body = await assertValidDto(CompanyDetailDto, res.body);

    expect(body).toHaveProperty('id');
    expect(body.name).toBe('Empresa Teste');
    companyId = body.id;
  });

  it('/company (GET)', async () => {
    const res = await request(
      app.getHttpServer() as unknown as import('http').Server,
    )
      .get('/company')
      .expect(200);

    const body = await assertValidDto(CompanyPaginatedResponseDto, res.body);

    expect(body).toHaveProperty('nodes');
    expect(Array.isArray(body.nodes)).toBe(true);
  });

  it('/company/:id (GET)', async () => {
    const res = await request(
      app.getHttpServer() as unknown as import('http').Server,
    )
      .get(`/company/${companyId}`)
      .expect(200);

    const body = await assertValidDto(CompanyDetailDto, res.body);

    expect(body).toHaveProperty('id', companyId);
  });

  it('/company/:id (PATCH)', async () => {
    const res = await request(
      app.getHttpServer() as unknown as import('http').Server,
    )
      .patch(`/company/${companyId}`)
      .send({ name: 'Empresa Atualizada' })
      .expect(200);

    const body = await assertValidDto(CompanyDetailDto, res.body);

    expect(body.name).toBe('Empresa Atualizada');
  });

  it('/company/:id (DELETE)', async () => {
    const res = await request(
      app.getHttpServer() as unknown as import('http').Server,
    )
      .delete(`/company/${companyId}`)
      .expect(200);

    const body = await assertValidDto(CompanyDetailDto, res.body);

    expect(body).toHaveProperty('id', companyId);
  });
});
