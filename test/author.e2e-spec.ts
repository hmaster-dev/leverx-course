import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('AuthorController e2e test', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should create a new author with 201', () => {
    return request(app.getHttpServer())
      .post('/authors')
      .send({
        name: 'e2e-test author',
      })
      .set(
        'Authorization',
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJzaHVzdGFydEBnbWFpbC5jb20iLCJpYXQiOjE2NDc1MTc4ODd9.0-y7sRAmjPhiGSl1o2paCv1iB2PQOzjZXGlba9nEtFY',
      )
      .expect(201);
  });

  it('should return a 400 when invalid dto', () => {
    return request(app.getHttpServer())
      .post('/authors')
      .set(
        'Authorization',
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJzaHVzdGFydEBnbWFpbC5jb20iLCJpYXQiOjE2NDc1MTc4ODd9.0-y7sRAmjPhiGSl1o2paCv1iB2PQOzjZXGlba9nEtFY',
      )
      .send({})
      .expect(400);
  });
});
