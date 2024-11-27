import { Component, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { NgFor } from '@angular/common';
import { AddPlayerInputComponent } from '../add-game-players/add-player-input/add-player-input.component';
import { Player } from '../../../shared/types/types';
import { GameService } from '../game.service';

@Component({
  selector: 'app-team-players',
  standalone: true,
  imports: [AddPlayerInputComponent, NgFor],
  templateUrl: './team-players.component.html',
  styleUrl: './team-players.component.css',
})
export class TeamPlayersComponent implements OnInit {
  teamPlayers: Player[] = [];
  addPlayerSub!: Subscription;
  ngOnInit(): void {
    this.addPlayerSub = this.gameService.onAddPlayerToTeam.subscribe(
      (player) => (this.teamPlayers = [...this.teamPlayers, player])
    );
  }

  constructor(private gameService: GameService) {}
}
