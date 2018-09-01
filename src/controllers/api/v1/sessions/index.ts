import { Request, Response } from 'express';

import { validate } from 'controllers/concerns/validate';
import { PasswordNotCorrectError } from 'errors/passwordNotCorrectError';
import { ResourceNotFoundError } from 'errors/resourceNotFoundError';
import { comparePlainWithHash } from 'helpers/bcrypt';
import { genToken } from 'helpers/jwt';
import { respondWith } from 'helpers/response';
import { User } from 'models/user';

export const sessionsCreate = async (req: Request, res: Response) => {
  try {
    await validate(req, ['name', 'password']);

    const user = (await User.findOne({
      where: { name: req.body.name },
    })) as any;

    if (user == null) {
      throw new ResourceNotFoundError();
    }

    const isPasswordCorrect = await comparePlainWithHash(
      req.body.password,
      user.password,
    );

    if (!isPasswordCorrect) {
      throw new PasswordNotCorrectError();
    }

    respondWith(res, 200, genToken({ name: user.name }));
  } catch (e) {
    console.log(e);

    if (e instanceof ResourceNotFoundError) {
      return respondWith(res, 400, e);
    }

    if (e instanceof PasswordNotCorrectError) {
      return respondWith(res, 400, e);
    }

    return respondWith(res, 500, e);
  }
};
