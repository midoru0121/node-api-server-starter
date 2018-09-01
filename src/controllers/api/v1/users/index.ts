import { Request, Response } from 'express';

import { validate } from 'controllers/concerns/validate';
import { ParamsValidationError } from 'errors/paramsValidationError';
import { genHash } from 'helpers/bcrypt';
import { respondWith } from 'helpers/response';
import { User } from 'models/user';

export const usersIndex = async (req: Request, res: Response) => {
  try {
    const users = await User.findAll();
    respondWith(res, 200, users);
  } catch (e) {
    respondWith(res, 500, null);
  }
};

export const usersCreate = async (req: Request, res: Response) => {
  try {
    await validate(req, ['name', 'password']);
    const encrypted = await genHash(req.body.password);
    const user = await User.findOrCreate({
      where: {
        name: req.body.name,
      },
      defaults: {
        password: encrypted,
      },
    });

    respondWith(res, 200, user);
  } catch (e) {
    console.log(e);
    if (e instanceof ParamsValidationError) {
      return respondWith(res, 400, e);
    }

    respondWith(res, 500, e);
  }
};
