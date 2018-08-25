import { NextFunction, Request, Response } from 'express';

import { TokenInvalidError } from 'errors/tokenInvalidError';
import { stripBearer, verifyToken } from 'helpers/jwt';
import { respondWith } from 'helpers/response';

const tokenHeader = 'x-auth-token';
const Bearer = 'Bearer';

const isAuthHeaderInvalid = (headers: {}) =>
  headers == null ||
  headers[tokenHeader] == null ||
  !headers[tokenHeader].includes(Bearer) ||
  headers[tokenHeader] === '';

export const requireAuth = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (isAuthHeaderInvalid(req.headers)) {
      throw new TokenInvalidError();
    }

    const token = stripBearer(req.headers[tokenHeader] as string);

    await verifyToken(token).catch((error: any) => {
      throw new TokenInvalidError();
    });

    next();
  } catch (e) {
    if (e instanceof TokenInvalidError) {
      return respondWith(res, 400);
    }

    respondWith(res, 500);
  }
};
