import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JWTToken } from '../shared/types/types';

const AUTH_ROUTE = 'http://localhost:5000/api/auth';

@Injectable({ providedIn: 'root' })
export class AuthApiService {
  public loginAsAdmin(password: string) {
    return this.http.post<{ accessToken: JWTToken; refreshToken: JWTToken }>(
      AUTH_ROUTE + '/login',
      { password }
    );
  }

  public refreshTokens(refreshToken: JWTToken) {
    return this.http.post<{ accessToken: JWTToken; refreshToken: JWTToken }>(
      AUTH_ROUTE + '/refresh',
      { refreshToken }
    );
  }
  constructor(private http: HttpClient) {}
}
