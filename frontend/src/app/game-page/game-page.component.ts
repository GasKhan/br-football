import { Component, OnInit } from '@angular/core';
import { GameTeamComponent } from './game-team/game-team.component';
import { Game } from '../shared/types/types';
import { GameService } from './game.service';
import { Observable, of } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-game-page',
  standalone: true,
  imports: [AsyncPipe, GameTeamComponent],
  templateUrl: './game-page.component.html',
  styleUrl: './game-page.component.css',
})
export class GamePageComponent {
  onRatingBlur(teamId: number, teamPlayerId: number, event: FocusEvent): void {
    const inputElement = event.target as HTMLInputElement;
    const rating = inputElement.value;

    if (rating && rating !== '') {
      this.gameService.setPlayerRating(teamId, teamPlayerId, +rating);
    }
  }

  onPointsBlur(teamId: number, event: FocusEvent): void {
    const inputElement = event.target as HTMLInputElement;
    const points = inputElement.value;
    if (points && points !== '') {
      this.gameService.setTeamPoints(teamId, +points);
    }
  }

  constructor(public gameService: GameService) {}
}
