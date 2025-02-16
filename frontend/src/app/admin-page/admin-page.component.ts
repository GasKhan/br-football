import { Component } from '@angular/core';
import { PlayersListComponent } from '../players-list/players-list.component';
import { RouterLink } from '@angular/router';
import { CreatePlayerComponent } from '../create-player/create-player.component';

@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [CreatePlayerComponent, PlayersListComponent, RouterLink],
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.css',
})
export class AdminPageComponent {}
