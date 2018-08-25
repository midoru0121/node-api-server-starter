import { path } from 'constants/path';
import { sessionsCreate } from 'controllers/api/v1/sessions';
import { usersCreate, usersIndex } from 'controllers/api/v1/users';
import { Root } from 'controllers/root';
import { Express } from 'express';
import { requireAuth } from 'middlewares/auth';

/*
  Defines all of the application routes.
*/
export const defineRoutes = (app: Express) => {
  app.get(path.root, Root);

  /* Sessions */
  app.post('/sessions/', sessionsCreate);

  /* Users */
  app.get('/users/', requireAuth, usersIndex);
  app.post('/users/', requireAuth, usersCreate);
};
