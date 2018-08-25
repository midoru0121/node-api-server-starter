import { sequelizeInstance } from 'config/database';
import { seedUsers } from './seeds/user';

(async () => {
  await seedUsers();
  sequelizeInstance.close();
})();
