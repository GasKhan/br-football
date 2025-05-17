import { NextFunction, Request, Response } from 'express';
import { loginService, refreshTokensService } from './auth.services';

export const login = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { password } = req.body;

    const { accessToken, refreshToken } = loginService(password);
    res.status(200).json({ accessToken, refreshToken });
  } catch (err) {
    next(err);
  }
};

export const refreshTokens = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { refreshToken: token } = req.body;
    const { accessToken, refreshToken } = refreshTokensService(token);

    res.status(200).json({ accessToken, refreshToken });
  } catch (err) {
    next(err);
  }
};

export const logout = (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).json({
      message: 'Logout successful',
    });
  } catch (err) {
    next(err);
  }
};
