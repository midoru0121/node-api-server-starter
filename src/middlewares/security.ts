import { Express } from 'express';
import helmet = require('helmet');

const useHelmet = (app: Express) => {
  app.use(helmet());
};

export const useSecurityMiddlewares = (app: Express) => {
  useHelmet(app);
};
