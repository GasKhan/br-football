import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from './auth.service';
import { LoginPopupService } from './loginPopup.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  password = '';

  sendPassword(event: SubmitEvent) {
    event.preventDefault();
    console.log('Sending password ' + this.password);

    this.authService.login(this.password);
  }

  constructor(
    protected authService: AuthService,
    protected loginPopupService: LoginPopupService
  ) {}
}
