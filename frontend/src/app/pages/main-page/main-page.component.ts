import { Component } from '@angular/core';
import { AwardsListComponent } from '../../widgets/awards-list/awards-list.component';
import { InfographicsListComponent } from '../../infographics-list/infographics-list.component';
import { TeamListComponent } from '../game-page/team-list/team-list.component';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [InfographicsListComponent, AwardsListComponent, TeamListComponent],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css',
})
export class MainPageComponent {}
