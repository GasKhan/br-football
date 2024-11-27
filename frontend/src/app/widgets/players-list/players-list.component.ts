import { Component } from '@angular/core';
import { PlayersService } from '../../shared/services/players.service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { PlayersStore } from '../../entities/players/model/players.store';

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
