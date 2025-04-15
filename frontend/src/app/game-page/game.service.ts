import { Injectable } from '@angular/core';
import { GameApiService } from './gameApi.service';
import { BehaviorSubject, Observable, take, tap } from 'rxjs';
import { Game, Rating, TeamPoints } from '../shared/types/types';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private _gameData!: BehaviorSubject<Game>;
  public gameData$!: Observable<Game>;
  private _isAllFieldsFilledError = new BehaviorSubject<boolean>(false);
  public isAllFieldsFilledError$ = this._isAllFieldsFilledError.asObservable();

  getActiveGameData(): void {
    this.gameApiService
      .getActiveGameData()
      .pipe(
        take(1),
        tap((gameData) => {
          console.log('gameData', gameData);
        })
      )
      .subscribe((gameData) => {
        this._gameData = new BehaviorSubject<Game>(gameData);
        this.gameData$ = this._gameData.asObservable();
      });
  }

  setPlayerRating(
    teamId: number,
    teamPlayerId: number,
    newRating: number
  ): void {
    const updatedGameData = {
      ...this._gameData.value,
      teams: this._gameData.value.teams.map((team) => {
        if (team.id === teamId) {
          return {
            ...team,
            players: team.players.map((player) => {
              if (player.teamPlayerId === teamPlayerId) {
                return { ...player, rating: newRating };
              }
              return player;
            }),
          };
        }
        return team;
      }),
    };
    this._gameData.next(updatedGameData);
  }

  setTeamPoints(teamId: number, points: number): void {
    const updatedGameData = {
      ...this._gameData.value,
      teams: this._gameData.value.teams.map((team) => {
        if (team.id === teamId) {
          return { ...team, points };
        }
        return team;
      }),
    };
    this._gameData.next(updatedGameData);
  }

  saveResults(): void {
    const results: TeamPoints[] = [];
    const ratings: Rating[] = [];

    this._gameData.value.teams.forEach((team) => {
      results.push({
        teamId: team.id!,
        points: team.points,
      });

      team.players.forEach((player) =>
        ratings.push({
          teamPlayerId: player.teamPlayerId,
          playerRating: player.rating,
        })
      );
    });

    if (ratings.some((rating) => rating.playerRating === 0)) {
      this._isAllFieldsFilledError.next(true);
      return;
    }

    console.log('gameResults', results);
    console.log('player ratings', ratings);

    this.gameApiService.saveGameResults({ results, ratings }).subscribe({
      next: () => {
        console.log('Results saved successfully!');
        this._isAllFieldsFilledError.next(false);
      },
      error: (error) => {
        console.error('Error saving results:', error);
      },
    });
  }

  constructor(private gameApiService: GameApiService) {}
}
