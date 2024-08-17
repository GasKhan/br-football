import { Component } from '@angular/core';
import { TeamListComponent } from '../team-list/team-list.component';
import { AwardsListComponent } from '../awards-list/awards-list.component';
import { InfographicsListComponent } from '../infographics-list/infographics-list.component';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [InfographicsListComponent, AwardsListComponent, TeamListComponent],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css',
})
export class MainPageComponent {}
