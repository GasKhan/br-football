import { Injectable } from '@angular/core';
import { JWTToken } from '../shared/types/types';

const ACCESS_TOKEN = 'accessToken';
const REFRESH_TOKEN = 'refreshToken';
const IS_ADMIN = 'isAdmin';

@Injectable({ providedIn: 'root' })
export class TokenService {
  getAccessToken() {
    return localStorage.getItem(ACCESS_TOKEN);
  }
  getRefreshToken() {
    return localStorage.getItem(REFRESH_TOKEN);
  }

  setAccessToken(token: JWTToken) {
    localStorage.setItem(ACCESS_TOKEN, token);
  }

  setRefreshToken(token: JWTToken) {
    localStorage.setItem(REFRESH_TOKEN, token);
  }

  // setIsAdmin() {
  //   localStorage.setItem(IS_ADMIN, 'true');
  // }

  // getIsAdmin() {
  //   localStorage.getItem(IS_ADMIN);
  // }

  logout() {
    localStorage.clear();
  }
}
