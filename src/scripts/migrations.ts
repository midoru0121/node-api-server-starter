import { sequelizeInstance } from 'config/database';
import { createUserMigrate } from './migrations/createUser';

(async () => {
  await createUserMigrate();

  sequelizeInstance.close();
})();
