import jwt = require('jsonwebtoken');

import { JWT_CONFIG } from 'config/jwt';

export const genToken = (hash: {}) =>
  jwt.sign({ hash }, process.env.SECRET_KEY_BASE as string, {
    ...JWT_CONFIG,
  });

export const verifyToken = (token: string) =>
  new Promise((resolve, reject) => {
    jwt.verify(
      token,
      process.env.SECRET_KEY_BASE as string,
      (err: any, decoded: any) => {
        if (err) {
          throw err;
        }
        resolve(decoded);
      },
    );
  });

export const stripBearer = (willBeReplaced: string) =>
  willBeReplaced.replace(/Bearer\s/, '');
