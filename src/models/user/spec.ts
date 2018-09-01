import { User } from 'models/user';
import assert from 'power-assert';
import {
  destroyTestUser,
  findOrCreateTestUser,
  TEST_USER_NAME,
} from 'spec/factories/userFactory';

describe('User', () => {
  describe('Positive', () => {
    beforeEach(() =>
      new Promise(async resolve => {
        await findOrCreateTestUser({});
        resolve();
      }));

    afterEach(() =>
      new Promise(async resolve => {
        await destroyTestUser();
        resolve();
      }));

    it('success', () =>
      new Promise(async (resolve, reject) => {
        const user = (await User.findOne({
          where: { name: TEST_USER_NAME },
        })) as any;
        assert.equal(user.name, TEST_USER_NAME);

        resolve();
      }));
  });

  describe('Negative', () => {
    it('fail without name', () =>
      new Promise(async (resolve, reject) => {
        try {
          await User.create({
            password: 'foobar',
          });
        } catch (e) {
          assert.ok(e.message.includes('users.name cannot be null'));
          resolve();
        }
      }));
  });
});
