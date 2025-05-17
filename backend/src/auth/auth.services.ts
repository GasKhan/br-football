import jwt from 'jsonwebtoken';
import { StringValue } from 'ms';
import { UnauthorizedError } from '../shared/errors/unauthorizedError';
import { ForbiddenError } from '../shared/errors/forbiddenError';

//TODO: hash password and compare hashes
export const loginService = (password: string) => {
  if (password !== process.env.ADMIN_PASSWORD) {
    throw new UnauthorizedError({ message: 'Invalid password' });
  }
  return generateTokens();
};

export const refreshTokensService = (refreshToken: string) => {
  jwt.verify(refreshToken, process.env.JWT_REFRESH as string, (err) => {
    if (err)
      throw new ForbiddenError({
        message: 'Refresh token is invalid or expired',
      });
  });
  return generateTokens();
};

const generateTokens = () => {
  const accessToken = jwt.sign(
    { isAdmin: true },
    process.env.JWT_SECRET as string,
    {
      expiresIn: process.env.JWT_EXPIRES_IN as StringValue,
      issuer: process.env.JWT_ISSUER,
    }
  );

  const refreshToken = jwt.sign(
    { isAdmin: true },
    process.env.JWT_REFRESH as string,
    {
      expiresIn: process.env.JWT_REFRESH_EXPIRES_IN as StringValue,
      issuer: process.env.JWT_ISSUER,
    }
  );

  return { accessToken, refreshToken };
};
