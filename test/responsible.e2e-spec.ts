import { ResponsiblePaginatedResponseDto } from '../src/responsible/dto/responsible-paginated-response.dto';
import { ResponsibleDetailDto } from '../src/responsible/dto/responsible-detail.dto';
import { createTestApp, createCompany } from './test-setup';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';

describe('ResponsibleController (e2e)', () => {
  let app: INestApplication;
  let companyId: number;
  let responsibleId: number;

  beforeAll(async () => {
    app = await createTestApp();
    companyId = await createCompany(app, 'Empresa Responsável');
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

  it('/responsible (POST)', async () => {
    const res = await request(
      app.getHttpServer() as unknown as import('http').Server,
    )
      .post('/responsible')
      .send({
        name: 'Responsável Teste',
        phone: '11999999999',
        email: 'responsavel@email.com',
        cpf: '12345678900',
        companyId,
      })
      .expect(201);

    const body = await assertValidDto(ResponsibleDetailDto, res.body);

    expect(body).toHaveProperty('id');
    expect(body.name).toBe('Responsável Teste');
    responsibleId = body.id;
  });

  it('/responsible (GET)', async () => {
    const res = await request(
      app.getHttpServer() as unknown as import('http').Server,
    )
      .get('/responsible')
      .expect(200);

    const body = await assertValidDto(
      ResponsiblePaginatedResponseDto,
      res.body,
    );

    expect(body).toHaveProperty('nodes');
    expect(Array.isArray(body.nodes)).toBe(true);
  });

  it('/responsible/:id (GET)', async () => {
    const res = await request(
      app.getHttpServer() as unknown as import('http').Server,
    )
      .get(`/responsible/${responsibleId}`)
      .expect(200);

    const body = await assertValidDto(ResponsibleDetailDto, res.body);

    expect(body).toHaveProperty('id', responsibleId);
  });

  it('/responsible/:id (PATCH)', async () => {
    const res = await request(
      app.getHttpServer() as unknown as import('http').Server,
    )
      .patch(`/responsible/${responsibleId}`)
      .send({ name: 'Responsável Atualizado' })
      .expect(200);

    const body = await assertValidDto(ResponsibleDetailDto, res.body);

    expect(body.name).toBe('Responsável Atualizado');
  });

  it('/responsible/:id (DELETE)', async () => {
    const res = await request(
      app.getHttpServer() as unknown as import('http').Server,
    )
      .delete(`/responsible/${responsibleId}`)
      .expect(200);

    const body = await assertValidDto(ResponsibleDetailDto, res.body);

    expect(body).toHaveProperty('id', responsibleId);
  });
});
