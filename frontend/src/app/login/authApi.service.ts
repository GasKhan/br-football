import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JWTToken } from '../shared/types/types';

const AUTH_ROUTE = 'http://localhost:5000/api/auth';

@Injectable({ providedIn: 'root' })
export class AuthApiService {
  public loginAsAdmin(password: string) {
    return this.http.post<{ accessToken: JWTToken }>(
      AUTH_ROUTE + '/login',
      {
        password,
      },
      { withCredentials: true }
    );
  }

  public refreshTokens() {
    return this.http.get<{ accessToken: JWTToken }>(AUTH_ROUTE + '/refresh', {
      withCredentials: true,
    });
  }

  public logout() {
    return this.http.get<{ accessToken: JWTToken }>(AUTH_ROUTE + '/logout', {
      withCredentials: true,
    });
  }
  constructor(private http: HttpClient) {}
}
