import { Component } from '@angular/core';

import { TeamService } from './team.service';
import { AsyncPipe } from '@angular/common';
import { Player } from '../shared/types/types';
import { TeamColors } from '../shared/types/enums';
import { TeamPlayersComponent } from './team-players/team-players.component';
import { AddPlayerInputComponent } from './add-player-input/add-player-input.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-game-page',
  standalone: true,
  imports: [
    TeamPlayersComponent,
    AsyncPipe,
    AddPlayerInputComponent,
    RouterLink,
  ],
  templateUrl: './create-teams.component.html',
  styleUrl: './create-teams.component.css',
})
export class CreateTeamsComponent {
  removePlayerFromTeam(player: Player, teamColor: TeamColors) {
    this.teamService.removePlayerFromTeam(player, teamColor);
  }

  saveTeams() {
    this.teamService.saveTeams();
  }

  constructor(public teamService: TeamService) {}
}
