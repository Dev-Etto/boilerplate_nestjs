import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { ProductPaginatedResponseDto } from '../src/product/dto/product-paginated-response.dto';
import { ProductDetailDto } from '../src/product/dto/product-detail.dto';
import { createTestApp, createCompany } from './test-setup';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

describe('ProductController (e2e)', () => {
  let app: INestApplication;
  let companyId: number;
  let productId: number;

  beforeAll(async () => {
    app = await createTestApp();
    companyId = await createCompany(app, 'Empresa Produto');
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

  it('/product (POST)', async () => {
    const res = await request(
      app.getHttpServer() as unknown as import('http').Server,
    )
      .post('/product')
      .send({ name: 'Produto Teste', price: 10.5, companyId })
      .expect(201);
    const body = await assertValidDto(ProductDetailDto, res.body);
    expect(body).toHaveProperty('id');
    expect(body.name).toBe('Produto Teste');
    productId = body.id;
  });

  it('/product (GET)', async () => {
    const res = await request(
      app.getHttpServer() as unknown as import('http').Server,
    )
      .get('/product')
      .expect(200);
    const body = await assertValidDto(ProductPaginatedResponseDto, res.body);
    expect(body).toHaveProperty('nodes');
    expect(Array.isArray(body.nodes)).toBe(true);
  });

  it('/product/:id (GET)', async () => {
    const res = await request(
      app.getHttpServer() as unknown as import('http').Server,
    )
      .get(`/product/${productId}`)
      .expect(200);
    const body = await assertValidDto(ProductDetailDto, res.body);
    expect(body).toHaveProperty('id', productId);
  });

  it('/product/:id (PATCH)', async () => {
    const res = await request(
      app.getHttpServer() as unknown as import('http').Server,
    )
      .patch(`/product/${productId}`)
      .send({ name: 'Produto Atualizado', price: 20 })
      .expect(200);
    const body = await assertValidDto(ProductDetailDto, res.body);
    expect(body.name).toBe('Produto Atualizado');
    expect(body.price).toBe(20);
  });

  it('/product/:id (DELETE)', async () => {
    const res = await request(
      app.getHttpServer() as unknown as import('http').Server,
    )
      .delete(`/product/${productId}`)
      .expect(200);
    const body = await assertValidDto(ProductDetailDto, res.body);
    expect(body).toHaveProperty('id', productId);
  });
});
