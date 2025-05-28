import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LoginPopupService } from '../login/loginPopup.service';
import { AuthService } from '../login/auth.service';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  animations: [
    trigger('openCloseNav', [
      state(
        'open',
        style({
          transform: 'translateX(-400px)',
        })
      ),
      state(
        'closed',
        style({
          transform: 'translateX(400px)',
        })
      ),
      transition('open => closed', [animate('1s ease-in')]),
      transition('closed => open', [animate('0.5s ease-in')]),
    ]),
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  title = 'BrFootball';
  isNavOpen = false;

  toggleNav() {
    this.isNavOpen = !this.isNavOpen;
  }

  openLoginPopup() {
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
