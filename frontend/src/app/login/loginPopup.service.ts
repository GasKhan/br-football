import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginPopupService {
  private _isLoginShown = signal(false);
  public isLoginShown = this._isLoginShown.asReadonly();

  toggleLoginPopup() {
    this._isLoginShown.set(!this._isLoginShown());
  }
}
