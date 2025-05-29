import { NextFunction, Request, Response } from 'express';
import { loginService, refreshTokensService } from './auth.services';
import { ForbiddenError } from '../shared/errors/forbiddenError';

export const login = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { password } = req.body;
    const { accessToken, refreshToken } = loginService(password);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      // secure:true,
      // sameSite: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ accessToken });
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
    console.log('cookies are ' + JSON.stringify(req.cookies, null, 2));
    const { refreshToken: token } = req.cookies;
    // console.log('refresh token id ' + token);
    if (!token) {
      throw new ForbiddenError({ message: 'Refresh token wasnt provided' });
    }
    console.log('token is ' + token);

    const { accessToken, refreshToken } = refreshTokensService(token);
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      // secure:true,
      // sameSite: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ accessToken });
  } catch (err) {
    next(err);
  }
};

export const logout = (req: Request, res: Response, next: NextFunction) => {
  console.log('logging out');
  try {
    const { refreshToken: token } = req.cookies;
    if (token) return res.sendStatus(204);

    res.clearCookie('refreshToken', {
      httpOnly: true,
      // secure: true,
      // sameSite: true,
    });

    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};
