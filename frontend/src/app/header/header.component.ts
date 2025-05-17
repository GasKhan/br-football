import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LoginPopupService } from '../login/loginPopup.service';

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

  constructor(protected loginPopupService: LoginPopupService) {}
}
