import { Component, OnDestroy, OnInit } from '@angular/core';
import { GameService } from './game.service';
import { Subscription } from 'rxjs';
import { AddGamePlayersComponent } from './add-game-players/add-game-players.component';
import { CreateGameComponent } from '../../features/create-game/create-game.component';

enum stages {
  START = 'start',
  TEAMS_SETTING = 'teams setting',
  GOALS_SETTING = 'goals setting',
  RATING_SETTING = 'ratings setting',
  FINISH = 'finish',
}

@Component({
  selector: 'app-game-page',
  standalone: true,
  imports: [CreateGameComponent, AddGamePlayersComponent],
  templateUrl: './game-page.component.html',
  styleUrl: './game-page.component.css',
})
export class GamePageComponent implements OnInit, OnDestroy {
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
