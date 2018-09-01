import { path } from 'config/path';
import { genToken } from 'helpers/jwt';
import { app } from 'index';
import { User } from 'models/user';
import assert from 'power-assert';
import {
  destroyTestUser,
  TEST_USER_NAME,
  TEST_USER_PASS,
} from 'spec/factories/userFactory';
import request from 'supertest';

describe(`Users Controller`, () => {
  beforeEach(() =>
    new Promise(async resolve => {
      await destroyTestUser();
      resolve();
    }));

  afterEach(() =>
    new Promise(async resolve => {
      await destroyTestUser();
      resolve();
    }));

  describe('Create', () => {
    describe(`Positive`, () =>
      it('User will be successfully created', () =>
        new Promise(resolve => {
          request(app)
            .post(path.users)
            .send({
              name: TEST_USER_NAME,
              password: TEST_USER_PASS,
            })
            .set('Accept', 'application/json')
            .set('X-Requested-With', 'XMLHttpRequest')
            .set('X-Auth-Token', `Bearer ${genToken({})}`)
            .then(async (res: any) => {
              const createdUser = (await User.findOne({
                where: { name: TEST_USER_NAME },
              })) as any;
              assert.equal(res.statusCode, 200);
              assert.equal(createdUser.name, TEST_USER_NAME);
              resolve();
            });
        })));
  });
});
