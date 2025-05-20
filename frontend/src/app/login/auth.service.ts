import { Injectable, signal } from '@angular/core';
import { AuthApiService } from './authApi.service';
import { take } from 'rxjs/operators';
import { LoginPopupService } from './loginPopup.service';
import { TokenService } from './token.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _isAdmin = signal(false);
  public isAdmin = this._isAdmin.asReadonly();
  public authError = signal<string | null>(null);

  login(password: string) {
    this.authApiService
      .loginAsAdmin(password)
      .pipe(take(1))
      .subscribe({
        next: ({ accessToken, refreshToken }) => {
          this._isAdmin.set(true);
          this.authError.set(null);

          this.tokenService.setAccessToken(accessToken);
          this.tokenService.setRefreshToken(refreshToken);

          this.loginPopupService.toggleLoginPopup();
        },
        //TODO: type error properly
        error: (err: any) => {
          console.log(err.error.errors[0].message);
          this.authError.set(err.error.errors[0].message);
        },
      });
  }

  logout() {
    this._isAdmin.set(false);
    this.authError.set(null);

    this.tokenService.logout();
    // this.loginPopupService.toggleLoginPopup();
  }

  constructor(
    private authApiService: AuthApiService,
    private loginPopupService: LoginPopupService,
    private tokenService: TokenService
  ) {
    const isAdmin = tokenService.checkIsAdmin();

    this._isAdmin.set(isAdmin);
  }
}
