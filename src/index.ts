import express, { Express } from 'express';

import { APP_PORT } from 'config/const';
import { requireEnvironmentVars } from 'config/environmentVars';
import { defineRoutes } from 'config/routes';
import { infoLog } from 'helpers/logger';
import { useRequestMiddlewares } from 'middlewares/request';
import { useResponseMiddlewares } from 'middlewares/response';
import { useSecurityMiddlewares } from 'middlewares/security';

const listen = (expressApp: Express) => {
  expressApp.listen(APP_PORT, () => {
    infoLog('Node Process is running at port : ' + APP_PORT);
  });
};

const defRoutes = (expressApp: Express) => {
  defineRoutes(expressApp);
};

const applyMiddlewares = (expressApp: Express) => {
  useResponseMiddlewares(expressApp);
  useRequestMiddlewares(expressApp);
  useSecurityMiddlewares(expressApp);
};

const startServer = (expressApp: Express) => {
  requireEnvironmentVars();
  applyMiddlewares(expressApp);
  defRoutes(expressApp);

  if (!module.parent) {
    listen(expressApp);
  }
};

export const app = express();
startServer(app);
