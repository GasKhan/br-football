import { NextFunction, Request, Response } from 'express';
import { UnauthorizedError } from '../shared/errors/unauthorizedError';
import jwt from 'jsonwebtoken';

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const accessToken = req.headers['authorization'];

    if (!accessToken) {
      throw new UnauthorizedError({
        message: 'Access token is missing',
      });
    }

    jwt.verify(accessToken, process.env.JWT_SECRET as string, (err) => {
      if (err) {
        throw new UnauthorizedError({
          message: 'Invalid access token',
        });
      }
      next();
    });
  } catch (err) {
    next(err);
  }
};
