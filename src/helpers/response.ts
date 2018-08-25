import { Response } from 'express';

import { buildApiScheme } from 'config/scheme';

export const respondWith = (res: Response, status: number, data: any = {}) => {
  res.status(status).send(buildApiScheme(status, data));
};
