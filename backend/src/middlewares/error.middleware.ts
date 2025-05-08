import { NextFunction, Request, Response } from 'express';
import { BadRequestError } from '../shared/errors/badRequestError';

export const errorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof BadRequestError) {
    if (err.logging) {
      console.error(
        'BadRequestError:',
        JSON.stringify(
          {
            stack: err.stack,
            context: err.statusCode,
            errors: err.errors,
          },
          null,
          2
        )
      );
    }
    return res.status(err.statusCode).json({
      errors: err.errors,
    });
  }

  console.error(JSON.stringify(err, null, 2));
  return res.status(500).json({
    errors: [
      {
        message: 'Internal server error',
      },
    ],
  });
};
