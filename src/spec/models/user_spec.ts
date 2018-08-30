import { User } from 'models/user';
import assert from 'power-assert';

const hoge = async (callback: any, ...args: never[]) => {
  try {
    callback(...args);
  } catch (e) {
    return e;
  }
};

describe('A suite', () => {
  it('contains spec with an expectation', () =>
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
