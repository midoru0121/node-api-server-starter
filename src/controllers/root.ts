import { Request, Response } from 'express';

import { respondWith } from 'helpers/response';

export const Root = (req: Request, res: Response) => {
  respondWith(res, 200, 'Hello World');
};
