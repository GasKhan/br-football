import { Injectable, signal } from '@angular/core';
import { take } from 'rxjs/operators';
import { AuthApiService } from './authApi.service';
import { LoginPopupService } from './loginPopup.service';
import { JWTToken } from '../shared/types/types';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _isAdmin = signal(false);
  public readonly accessToken = signal<string | null>(null);
  public isAdmin = this._isAdmin.asReadonly();
  public authError = signal<string | null>(null);

  startLogin(password: string) {
    this.authApiService
      .loginAsAdmin(password)
      .pipe(take(1))
      .subscribe({
        next: ({ accessToken }) => this.login(accessToken),
        //TODO: type error properly
        error: (err: any) => {
          console.log(err.error.errors[0].message);
          this.authError.set(err.error.errors[0].message);
        },
      });
  }

  login(accessToken: JWTToken) {
    this._isAdmin.set(true);
    this.authError.set(null);

    this.accessToken.set(accessToken);

    this.loginPopupService.toggleLoginPopup();
  }

  logout() {
    this.authApiService
      .logout()
      .pipe(take(1))
      .subscribe(() => {
        this._isAdmin.set(false);
        this.authError.set(null);
        this.accessToken.set(null);
      });
    console.log('logging out');
  }

  constructor(
    private authApiService: AuthApiService,
    private loginPopupService: LoginPopupService
  ) {}
}
