import { Component, OnInit } from '@angular/core';
import { AddPlayerComponent } from '../../../add-player/add-player.component';
import { AddPlayerInputComponent } from '../add-player-input/add-player-input.component';
import { Player } from '../../../types/types';
import { Subject, Subscription } from 'rxjs';
import { GameService } from '../../game.service';
import { NgFor } from '@angular/common';

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
