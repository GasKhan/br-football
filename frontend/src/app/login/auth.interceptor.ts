import {
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators';
import { AuthApiService } from './authApi.service';
import { JWTToken } from '../shared/types/types';
import { AuthService } from './auth.service';

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  const authApiService = inject(AuthApiService);
  const authService = inject(AuthService);

  let authReq = req;
  let isRefreshing = false;
  const refreshTokenSubject = new BehaviorSubject<JWTToken | null>(null);

  const accessToken = authService.accessToken();
  if (accessToken) authReq = setAuthHeader(req, accessToken);

  return next(authReq).pipe(
    catchError((err) => {
      if (err.status === 401) {
        if (!isRefreshing) {
          isRefreshing = true;
          refreshTokenSubject.next(null);

          return authApiService.refreshTokens().pipe(
            switchMap(({ accessToken }) => {
              console.log('start refreshing');
              console.log('access token is - ', accessToken);
              authService.login(accessToken);

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
