import { sequelizeInstance } from 'config/database';
import { createUserMigrate } from 'scripts/migrations/createUser';

(async () => {
  await createUserMigrate();

  sequelizeInstance.close();
})();
