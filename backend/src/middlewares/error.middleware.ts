import { NextFunction, Request, Response } from 'express';
import { BadRequestError } from '../shared/errors/badRequestError';
import { ConflictError } from '../shared/errors/conflictError';
import { NotFoundError } from '../shared/errors/notFoundError';
import { UnauthorizedError } from '../shared/errors/unauthorizedError';

export const errorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (
    err instanceof BadRequestError ||
    err instanceof ConflictError ||
    err instanceof NotFoundError ||
    err instanceof UnauthorizedError
  ) {
    if (err.logging) {
      console.error(
        err.name,
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
