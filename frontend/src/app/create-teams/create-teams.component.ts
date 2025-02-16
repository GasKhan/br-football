import { Component } from '@angular/core';

import { GameService } from './game.service';
import { AsyncPipe } from '@angular/common';
import { Player } from '../shared/types/types';
import { TeamColors } from '../shared/types/enums';
import { GameApiService } from './gameApi.service';
import { TeamPlayersComponent } from './team-players/team-players.component';
import { AddPlayerInputComponent } from './add-player-input/add-player-input.component';

@Component({
  selector: 'app-game-page',
  standalone: true,
  imports: [TeamPlayersComponent, AsyncPipe, AddPlayerInputComponent],
  templateUrl: './create-teams.component.html',
  styleUrl: './create-teams.component.css',
})
export class CreateTeamsComponent {
  removePlayerFromTeam(player: Player, teamColor: TeamColors) {
    this.gameService.removePlayerFromTeam(player, teamColor);
  }

  saveTeams() {
    this.gameService.saveTeams();
  }

  constructor(
    public gameService: GameService,
    private gameApiService: GameApiService
  ) {}
}
