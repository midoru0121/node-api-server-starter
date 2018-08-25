import * as bodyParser from 'body-parser';
import { Express } from 'express';

const useBodyParser = (app: Express) => {
  app.use(
    bodyParser.urlencoded({
      extended: true,
    }),
  );
  app.use(bodyParser.json());
};

export const useRequestMiddlewares = (app: Express) => {
  useBodyParser(app);
};
