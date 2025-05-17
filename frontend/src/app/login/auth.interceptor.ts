import {
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, filter, switchMap, take, tap } from 'rxjs/operators';
import { TokenService } from './token.service';
import { AuthApiService } from './authApi.service';
import { JWTToken } from '../shared/types/types';
import { AuthService } from './auth.service';

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  const tokenService = inject(TokenService);
  const authApiService = inject(AuthApiService);
  const authService = inject(AuthService);

  let authReq = req;
  let isRefreshing = false;
  const refreshTokenSubject = new BehaviorSubject<JWTToken | null>(null);

  const accessToken = tokenService.getAccessToken();
  if (accessToken) authReq = setAuthHeader(req, accessToken);

  return next(authReq).pipe(
    catchError((err) => {
      if (err.status === 401) {
        if (!isRefreshing) {
          isRefreshing = true;
          refreshTokenSubject.next(null);

          const refreshToken = tokenService.getRefreshToken();

          //TODO: Refactor
          if (refreshToken) {
            return authApiService.refreshTokens(refreshToken).pipe(
              switchMap(({ accessToken, refreshToken }) => {
                tokenService.setAccessToken(accessToken);
                tokenService.setRefreshToken(refreshToken);

                isRefreshing = false;
                refreshTokenSubject.next(accessToken);

                const newReq = setAuthHeader(authReq, accessToken);
                return next(newReq);
              }),
              catchError((err) => {
                console.log('error at refreshing tokens /n', err);
                isRefreshing = false;
                authService.logout();

                return throwError(() => err);
              })
            );
          }
        }

        refreshTokenSubject.pipe(
          filter((token) => token !== null),
          take(1),
          switchMap((token) => next(setAuthHeader(authReq, token)))
        );
      }
      return throwError(() => err);
    })
  );
};

const setAuthHeader = (req: HttpRequest<unknown>, accessToken: JWTToken) => {
  return req.clone({
    headers: req.headers.set('authorization', accessToken),
  });
};
