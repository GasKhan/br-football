import { Injectable } from '@angular/core';
import { JWTToken } from '../shared/types/types';
import { jwtDecode } from 'jwt-decode';

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

  checkIsAdmin() {
    const token = this.getAccessToken();
    if (!token) return false;
    try {
      const { isAdmin } = jwtDecode(token) as { isAdmin?: boolean };
      console.log(isAdmin);
      return !!isAdmin;
    } catch (err) {
      return false;
    }
  }

  logout() {
    localStorage.clear();
  }
}
