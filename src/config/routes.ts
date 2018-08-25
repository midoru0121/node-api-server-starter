import { Express } from 'express';

import { path } from 'config/path';
import { sessionsCreate } from 'controllers/api/v1/sessions';
import { usersCreate, usersIndex } from 'controllers/api/v1/users';
import { Root } from 'controllers/root';
import { requireAuth } from 'middlewares/auth';

/*
  Defines all of the application routes.
*/
export const defineRoutes = (app: Express) => {
  app.get(path.root, Root);

  /* Sessions */
  app.post(path.sessions, sessionsCreate);

  /* Users. need authentication to access. */
  app.get(path.users, requireAuth, usersIndex);
  app.post(path.users, requireAuth, usersCreate);
};
