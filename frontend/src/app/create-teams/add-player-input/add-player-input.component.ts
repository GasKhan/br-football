import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { map, Observable, switchMap, tap } from 'rxjs';
import { Player } from '../../shared/types/types';
import { GameService } from '../game.service';
import { TeamColors } from '../../shared/types/enums';
import { PlayersStore } from '../../players.store';

@Component({
  selector: 'app-add-player-input',
  standalone: true,
  imports: [ReactiveFormsModule, AsyncPipe],
  templateUrl: './add-player-input.component.html',
  styleUrl: './add-player-input.component.css',
})
export class AddPlayerInputComponent {
  @Input({ required: true }) teamColor!: TeamColors;

  inputPlayerName = new FormControl('', { nonNullable: true });
  selectedPlayer: Player | null = null;
  searchedPlayers$: Observable<Player[]> =
    this.inputPlayerName.valueChanges.pipe(
      // filter((substr) => substr !== ''),
      switchMap((substr) =>
        this.playersStore.getfilteredPlayersBySubstr(substr).pipe(
          //TODO: Maybe should add take() here
          map((players) => players.slice(0, 5)),
          tap((r) => console.log(r))
        )
      )
    );

  onInput() {
    this.selectedPlayer = null;
  }

  onSelectPlayer(player: Player | null) {
    if (player) {
      this.inputPlayerName.setValue(player.playerName);
    } else this.inputPlayerName.setValue('');

    this.selectedPlayer = player;
  }

  onAddPlayer() {
    if (!this.selectedPlayer) return;
    this.gameService.addPlayerToTeam(this.selectedPlayer, this.teamColor);

    this.onSelectPlayer(null);
  }

  constructor(
    private playersStore: PlayersStore,
    private gameService: GameService
  ) {}
}
