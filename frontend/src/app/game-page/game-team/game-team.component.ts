import { Component, Input, OnInit } from '@angular/core';
import { Team } from '../../shared/types/types';
import { ListItemColorDirective } from '../../shared/list-item-color.directive';
import { GameService } from '../game.service';
import { Form, FormsModule, NgForm } from '@angular/forms';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-game-team',
  standalone: true,
  imports: [ListItemColorDirective, FormsModule, NgClass],
  templateUrl: './game-team.component.html',
  styleUrl: './game-team.component.css',
})
export class GameTeamComponent {
  @Input({ required: true }) team!: Team;

  onRatingChange(teamPlayerId: number, event: FocusEvent): void {
    const rating = (event.target as HTMLInputElement).value;
    const trimmedValue = rating.replace(/^0+/, '');

    if (/^(5(\.0+)?|[0-4](\.\d)?|0(\.\d+)?|)$/.test(trimmedValue)) {
      this.gameService.setPlayerRating(
        this.team.id!,
        teamPlayerId,
        +trimmedValue
      );
    } else {
      this.gameService.setPlayerRating(this.team.id!, teamPlayerId, 0);
    }
  }

  onPointsChange(event: FocusEvent): void {
    const points = (event.target as HTMLInputElement).value;
    const trimmedValue = points.replace(/^0+/, '');

    if (/^[1-9]?[0-9]$/.test(trimmedValue)) {
      this.gameService.setTeamPoints(this.team.id!, +trimmedValue);
    } else {
      this.gameService.setTeamPoints(this.team.id!, 0);
    }
  }

  onKeyPress(event: KeyboardEvent): void {
    const allowedKeys = [
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '.',
      'Backspace',
      'ArrowLeft',
      'ArrowRight',
    ];
    if (!allowedKeys.includes(event.key)) {
      event.preventDefault();
    }
  }

  constructor(protected gameService: GameService) {}
}
