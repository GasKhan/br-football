import { Component } from '@angular/core';
import { CreatePlayerComponent } from './create-player/create-player.component';
import { PlayersListComponent } from './players-list/players-list.component';

@Component({
  selector: 'app-players-page',
  standalone: true,
  imports: [CreatePlayerComponent, PlayersListComponent],
  templateUrl: './players-page.component.html',
  styleUrl: './players-page.component.css',
})
export class PlayersPageComponent {}
