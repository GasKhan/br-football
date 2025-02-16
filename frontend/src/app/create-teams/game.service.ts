import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, switchMap, take } from 'rxjs';
import { Player, Team } from '../shared/types/types';
import { TeamColors } from '../shared/types/enums';
import { GameApiService } from './gameApi.service';
import {
  MAX_PLAYERS_COUNT,
  MIN_PLAYERS_COUNT,
  REQUIRED_TEAMS_COUNT,
} from '../shared/config/config';

@Injectable({ providedIn: 'root' })
export class GameService {
  private teamsSubject = new BehaviorSubject<Team[]>([
    { teamColor: TeamColors.BLUE, players: [], points: 0 },
    { teamColor: TeamColors.RED, players: [], points: 0 },
    { teamColor: TeamColors.YELLOW, players: [], points: 0 },
  ]);

  addPlayerToTeam(player: Player, teamColor: TeamColors) {
    if (this.checkIsPlayerInTeams(player.playerId))
      throw new Error('Player has already been chosen');

    const editedTeams = this.teamsSubject.value.map((team) => {
      if (team.teamColor === teamColor) {
        if (team.players.length >= 5)
          throw new Error('Cant add more than 5 players');
        team.players.push(player);
      }

      return team;
    }) as Team[];

    this.teamsSubject.next(editedTeams);
  }

  removePlayerFromTeam(player: Player, teamColor: TeamColors) {
    const editedTeams = this.teamsSubject.value.map((team) => {
      if (team.teamColor === teamColor) {
        return {
          ...team,
          players: team.players.filter(
            (curPlayer) => curPlayer.playerId !== player.playerId
          ),
        };
      }
      return team;
    }) as Team[];

    this.teamsSubject.next(editedTeams);
  }

  checkIsPlayerInTeams(playerId: number) {
    return this.teamsSubject.value.some((team) =>
      team.players.some((player) => player.playerId === playerId)
    );
  }

  teams$ = this.teamsSubject.asObservable();

  public saveTeams() {
    console.log('saving teams');
    //TODO:Throw error if teams dont have required state
    this.teams$.pipe(
      take(1),
      filter((teams) => this.checkIsValidTeamsArray(teams)),
      switchMap((teams) => this.gameApiService.saveTeams(teams))
    );
  }

  checkIsValidTeamsArray(teams: Team[]) {
    return (
      Array.isArray(teams) &&
      teams.length === REQUIRED_TEAMS_COUNT &&
      teams.every(
        (team) =>
          team.players.length >= MIN_PLAYERS_COUNT &&
          team.players.length <= MAX_PLAYERS_COUNT
      )
    );
  }
  constructor(private gameApiService: GameApiService) {}
}
