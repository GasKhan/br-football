import { Component, OnDestroy } from '@angular/core';
import { GameTeamComponent } from './game-team/game-team.component';
import { GameService } from './game.service';
import { AsyncPipe } from '@angular/common';
import { DateFormatPipe } from '../shared/pipes/date-format.pipe';

@Component({
  selector: 'app-game-page',
  standalone: true,
  imports: [AsyncPipe, GameTeamComponent, DateFormatPipe],
  templateUrl: './game-page.component.html',
  styleUrl: './game-page.component.css',
})
export class GamePageComponent implements OnDestroy {
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

  ngOnDestroy(): void {
    this.gameService.clearGameData();
  }

  constructor(public gameService: GameService) {}
}
