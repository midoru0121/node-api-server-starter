import { User } from 'models/user';

export const createUserMigrate = () =>
  new Promise(async (resolve, reject) => {
    try {
      await User.sync();
      resolve();
    } catch (e) {
      reject(e);
    }
  });
