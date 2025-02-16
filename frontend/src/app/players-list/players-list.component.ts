import { Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { PlayersStore } from '../players.store';

@Component({
  selector: 'app-players-list',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './players-list.component.html',
  styleUrl: './players-list.component.css',
})
export class PlayersListComponent {
  players$ = this.playersStore.players$;

  constructor(private playersStore: PlayersStore) {
    this.playersStore.fetchPlayers();
  }
}
