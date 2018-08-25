import { Express, NextFunction, Request, Response } from 'express';

export const useResponseMiddlewares = (app: Express) => {
  app.use((req: Request, res: Response, next: NextFunction) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization, X-Auth-Token',
    );
    res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,PUT,PATCH');
    next();
  });
};
