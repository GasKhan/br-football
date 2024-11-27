import { Component } from '@angular/core';
import { GameService } from '../../game.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { Player } from '../../../../shared/types/types';
import { PlayersStore } from '../../../../entities/players/model/players.store';
import { tap } from 'rxjs';

@Component({
  selector: 'app-add-player-input',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor, NgIf],
  templateUrl: './add-player-input.component.html',
  styleUrl: './add-player-input.component.css',
})
export class AddPlayerInputComponent {
  inputPlayerName = new FormControl('');
  canAdd = false;
  selectedPlayer: Player | null = null;
  searchedPlayers: Player[] = [];

  onInput() {
    this.selectedPlayer = null;
    this.canAdd = false;

    const name = this.inputPlayerName.value;
    if (name === '' || name?.trim() === '' || name === null) {
      this.searchedPlayers = [];
      return;
    }
    this.playersStore
      .getfilteredPlayersBySubstr(name).pipe(
        tap(r=> console.log(r))
      )
      .subscribe((players: Player[]) => {
        this.searchedPlayers = [...players];
      });
  }

  onSelectPlayer(player: Player | null) {
    if (player) {
      this.inputPlayerName.setValue(player.playerName);
    } else this.inputPlayerName.setValue('');

    this.selectedPlayer = player;
    this.canAdd = true;
    this.searchedPlayers = [];
  }

  onAddPlayer() {
    if (this.selectedPlayer)
      this.gameService.onAddPlayerToTeam.next(this.selectedPlayer);

    this.onSelectPlayer(null);
    this.selectedPlayer = null;
    this.canAdd = false;
  }

  constructor(private gameService: GameService, private playersStore: PlayersStore) {}
}
