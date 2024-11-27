import { Component } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { GameService } from '../game.service';
import { TeamPlayersComponent } from '../team-players/team-players.component';

@Component({
  selector: 'app-add-game-players',
  standalone: true,
  imports: [ReactiveFormsModule, TeamPlayersComponent],
  templateUrl: './add-game-players.component.html',
  styleUrl: './add-game-players.component.css',
})
export class AddGamePlayersComponent {
  namesStartWith: string[] = [];

  teamsForm = new FormGroup({
    blueTeam: new FormGroup({
      currentPlayer: new FormControl(''),
      team: new FormArray([]),
    }),
    redTeam: new FormGroup({
      currentPlayer: new FormControl(''),
      team: new FormArray([]),
    }),
    yellowTeam: new FormGroup({
      currentPlayer: new FormControl(''),
      team: new FormArray([]),
    }),
  });

  constructor(private gameService: GameService) {}
}
