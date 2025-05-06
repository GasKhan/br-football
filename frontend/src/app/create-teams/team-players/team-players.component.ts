import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Player, Team } from '../../shared/types/types';

@Component({
  selector: 'app-team-players',
  standalone: true,
  imports: [],
  templateUrl: './team-players.component.html',
  styleUrl: './team-players.component.css',
})
export class TeamPlayersComponent {
  @Input({ required: true }) team!: Team;
  @Output() removePlayer = new EventEmitter<Player>();

  onRemovePlayer(player: Player) {
    console.log('Removint player with id', player.id);
    this.removePlayer.emit(player);
  }
}
