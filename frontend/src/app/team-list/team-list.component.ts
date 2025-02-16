import { NgFor, NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { ListItemColor } from '../shared/list-item-color.directive';

export type TeamData = {
  teamColor: string;
  teamPlayers: string[];
};

@Component({
  selector: 'app-team-list',
  standalone: true,
  imports: [NgFor, NgStyle, ListItemColor],
  templateUrl: './team-list.component.html',
  styleUrl: './team-list.component.css',
})
export class TeamListComponent {
  teamData: TeamData = {
    teamColor: 'yellow',
    teamPlayers: ['Guseyn', 'Imam', 'Ibra balon', 'Nabi', 'Murka'],
  };
}
