import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';

export type AwardInfo = {
  awardName: string;
  playerName: string;
};

@Component({
  selector: 'app-awards-list',
  standalone: true,
  imports: [NgFor],
  templateUrl: './awards-list.component.html',
  styleUrl: './awards-list.component.css',
})
export class AwardsListComponent implements OnInit {
  awards: AwardInfo[] = [
    { awardName: 'MVP', playerName: 'Guseyn' },
    {
      awardName: 'Best scorer',
      playerName: 'IbraBalon',
    },
  ];

  ngOnInit(): void {}
}
