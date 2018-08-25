import { genHash } from 'helpers/bcrypt';
import { User } from 'models/user';

export const seedUsers = () =>
  new Promise(async (resolve, reject) => {
    const password = await genHash('password');
    await User.bulkCreate([
      {
        name: 'Erich',
        password,
      },
      {
        name: 'Richard',
        password,
      },
      {
        name: 'Ralph',
        password,
      },
      {
        name: 'John',
        password,
      },
    ]).catch(e => {
      console.log(e);
    });
    resolve();
  });
