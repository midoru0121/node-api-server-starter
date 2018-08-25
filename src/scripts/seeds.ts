import { sequelizeInstance } from 'config/database';
import { seedUsers } from 'scripts/seeds/user';

(async () => {
  await seedUsers();
  sequelizeInstance.close();
})();
