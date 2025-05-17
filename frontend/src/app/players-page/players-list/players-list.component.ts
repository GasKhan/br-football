import { Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { PlayersStore } from '../players.store';
import { ListItemColorDirective } from '../../shared/list-item-color.directive';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-players-list',
  standalone: true,
  imports: [AsyncPipe, ListItemColorDirective],
  templateUrl: './players-list.component.html',
  styleUrl: './players-list.component.css',
})
export class PlayersListComponent {
  players$ = this.playersStore.players$;

  constructor(private playersStore: PlayersStore) {}
}
