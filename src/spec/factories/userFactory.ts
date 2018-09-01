import { genHash } from 'helpers/bcrypt';
import { User } from 'models/user';

export const TEST_USER_NAME = 'test';
export const TEST_USER_PASS = 'password';

export const destroyTestUser = () =>
  new Promise(async resolve => {
    await User.destroy({
      where: {
        name: TEST_USER_NAME,
      },
    });
    resolve();
  });

export const findOrCreateTestUser = (otherAttrs: any) =>
  new Promise(async resolve => {
    const encryptedPassword = await genHash(TEST_USER_PASS);
    otherAttrs.password = encryptedPassword as string;
    const instance = await User.findOrCreate({
      where: {
        name: TEST_USER_NAME,
      },
      defaults: otherAttrs,
    });
    resolve(instance);
  });
