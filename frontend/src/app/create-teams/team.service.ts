import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, switchMap, take, tap } from 'rxjs';
import { Player, Team } from '../shared/types/types';
import { TeamColors } from '../shared/types/enums';
import { TeamApiService } from './teamApi.service';
import {
  MAX_PLAYERS_COUNT,
  MIN_PLAYERS_COUNT,
  REQUIRED_TEAMS_COUNT,
} from '../shared/config/config';

@Injectable({ providedIn: 'root' })
export class TeamService {
  private teamsSubject = new BehaviorSubject<Team[]>([
    { teamColor: TeamColors.BLUE, players: [], points: 0 },
    { teamColor: TeamColors.RED, players: [], points: 0 },
    { teamColor: TeamColors.YELLOW, players: [], points: 0 },
  ]);

  public teams$ = this.teamsSubject.asObservable();

  private createTeamError = new BehaviorSubject<string | null>(null);
  public createTeamError$ = this.createTeamError.asObservable();

  addPlayerToTeam(player: Player, teamColor: TeamColors) {
    if (this.checkIsPlayerInTeams(player.id))
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
            (curPlayer) => curPlayer.id !== player.id
          ),
        };
      }
      return team;
    }) as Team[];

    this.teamsSubject.next(editedTeams);
  }

  checkIsPlayerInTeams(playerId: number) {
    return this.teamsSubject.value.some((team) =>
      team.players.some((player) => player.id === playerId)
    );
  }

  public saveTeams() {
    console.log('starting save teams');
    // TODO: Throw error if teams don't have required state
    this.teams$
      .pipe(
        take(1),
        filter((teams) => this.checkIsTeamsValid(teams)),
        tap((teams) => {
          console.log('saving teams', teams);
        }),
        switchMap((teams) => this.teamApiService.saveTeams(teams))
      )
      .subscribe({
        next: () => {
          console.log('Teams saved successfully');
          this.createTeamError.next(null);
        },
        error: (err) => {
          console.error('Error saving teams:', err);
          this.createTeamError.next(
            'There is an active game already or teams are invalid'
          );
        },
      });
  }

  private checkIsTeamsValid(teams: Team[]) {
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
  constructor(private teamApiService: TeamApiService) {}
}
