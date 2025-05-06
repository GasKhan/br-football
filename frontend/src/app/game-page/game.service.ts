import { Injectable } from '@angular/core';
import { GameApiService } from './gameApi.service';
import { BehaviorSubject, catchError, Observable, take, tap } from 'rxjs';
import { Game, Rating, TeamPoints } from '../shared/types/types';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private _gameData!: BehaviorSubject<Game>;
  public gameData$!: Observable<Game>;
  private _isAllFieldsFilledError = new BehaviorSubject<boolean>(false);
  public isAllFieldsFilledError$ = this._isAllFieldsFilledError.asObservable();

  getGameData(id?: number): void {
    this.gameApiService
      .getGameData(id)
      .pipe(
        take(1),
        tap((gameData) => {
          console.log('gameData', gameData);
        }),
        catchError((error) => {
          console.error('Error fetching game data:', error);
          throw error;
        })
      )
      .subscribe((gameData) => {
        this._gameData = new BehaviorSubject<Game>(gameData);
        console.log('gameData', gameData);
        this.gameData$ = this._gameData.asObservable();
      });
  }

  setPlayerRating(teamId: number, playerId: number, newRating: number): void {
    const updatedGameData = {
      ...this._gameData.value,
      teams: this._gameData.value.teams.map((team) => {
        if (team.id === teamId) {
          return {
            ...team,
            players: team.players.map((player) => {
              if (player.id === playerId) {
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
          playerId: player.id,
          rating: player.rating,
        })
      );
    });

    if (ratings.some((rating) => rating.rating === 0)) {
      this._isAllFieldsFilledError.next(true);
      return;
    }

    console.log('gameResults', results);
    console.log('player ratings', ratings);

    this.gameApiService
      .saveGameResults({ gameId: this._gameData.value.id, results, ratings })
      .subscribe({
        next: () => {
          console.log('Results saved successfully!');
          this._isAllFieldsFilledError.next(false);
          this.router.navigate(['/game']);
        },
        error: (error) => {
          console.error('Error saving results:', error);
        },
      });
  }

  constructor(private gameApiService: GameApiService, private router: Router) {}
}
