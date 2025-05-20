import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LoginPopupService } from '../login/loginPopup.service';
import { AuthService } from '../login/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  title = 'BrFootball';

  loginAsAdmin() {
    this.loginPopupService.toggleLoginPopup();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  constructor(
    protected loginPopupService: LoginPopupService,
    protected authService: AuthService,
    private router: Router
  ) {}
}
