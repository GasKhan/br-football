import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { InfographicsListItemComponent } from './infographics-list-item/infographics-list-item.component';

export type PlayerInfo = { playerName: string; infoValue: number };

@Component({
  selector: 'app-infographics-list',
  standalone: true,
  imports: [NgFor, InfographicsListComponent, InfographicsListItemComponent],
  templateUrl: './infographics-list.component.html',
  styleUrl: './infographics-list.component.css',
})
export class InfographicsListComponent {
  infoArr: PlayerInfo[] = [
    {
      playerName: 'Guseyn',
      infoValue: 5,
    },
    {
      playerName: 'Imam',
      infoValue: 4,
    },
    {
      playerName: 'IbraBalon',
      infoValue: 3,
    },
  ];
}
