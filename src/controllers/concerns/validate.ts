import { ParamsValidationError } from 'errors/paramsValidationError';
import { Request } from 'express';

export const validate = (req: Request, params: string[]) =>
  new Promise((resolve, reject) => {
    if (!req.body == null) {
      reject(new ParamsValidationError());
    }

    params.forEach(param => {
      if (req.body[param] == null) {
        reject(new ParamsValidationError());
      }
    });

    resolve();
  });
