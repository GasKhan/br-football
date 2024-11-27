import { Component } from '@angular/core';
import { AddPlayerComponent } from '../../features/add-player/add-player.component';
import { PlayersListComponent } from '../../widgets/players-list/players-list.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [AddPlayerComponent, PlayersListComponent, RouterLink],
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.css',
})
export class AdminPageComponent {}
