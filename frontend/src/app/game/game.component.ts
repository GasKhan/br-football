import { Component, OnDestroy, OnInit } from '@angular/core';
import { CreateGameComponent } from './create-game/create-game.component';
import { GameService } from './game.service';
import { Subscription } from 'rxjs';
import { AddGamePlayersComponent } from './add-game-players/add-game-players.component';

enum stages {
  START = 'start',
  TEAMS_SETTING = 'teams setting',
  GOALS_SETTING = 'goals setting',
  RATING_SETTING = 'ratings setting',
  FINISH = 'finish',
}

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CreateGameComponent, AddGamePlayersComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css',
})
export class GameComponent implements OnInit, OnDestroy {
  stage = stages.START;
  gameId!: number;
  gameSubscription!: Subscription;

  ngOnInit(): void {
    this.gameSubscription = this.gameService.onCreateGame.subscribe(
      (gameId) => {
        if (typeof gameId === 'number') this.gameId = gameId;
        this.stage = stages.TEAMS_SETTING;
      }
    );
  }

  ngOnDestroy(): void {
    this.gameSubscription.unsubscribe();
  }

  constructor(private gameService: GameService) {}
}
