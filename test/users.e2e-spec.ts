import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../server/app.module';

import type { INestApplication } from '@nestjs/common';

describe('UsersController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  const body = {};
  const id = 1;

  // create
  it(`/v1/api/users (POST)`, () => {
    return request(app.getHttpServer())
      .post(`/v1/api/users`)
      .send(body)
      .expect(201)
      .expect(`This action adds a new user with dto ${JSON.stringify(body)}`);
  });

  // findAll
  it(`/v1/api/users (GET)`, () => {
    return request(app.getHttpServer())
      .get(`/v1/api/users`)
      .expect(200)
      .expect(`This action returns all users`);
  });

  // findOne
  it(`/v1/api/users/${id} (GET)`, () => {
    return request(app.getHttpServer())
      .get(`/v1/api/users/${id}`)
      .expect(200)
      .expect(`This action returns a #${id} user`);
  });

  // update
  it(`/v1/api/users/${id} (PATCH)`, () => {
    return request(app.getHttpServer())
      .patch(`/v1/api/users/${id}`)
      .send(body)
      .expect(200)
      .expect(
        `This action updates a #${id} user with dto ${JSON.stringify(body)}`,
      );
  });

  // delete
  it(`/v1/api/users/${id} (DELETE)`, () => {
    return request(app.getHttpServer())
      .delete(`/v1/api/users/${id}`)
      .expect(200)
      .expect(`This action removes a #${id} user`);
  });
});
