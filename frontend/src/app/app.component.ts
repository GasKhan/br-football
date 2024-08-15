import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { InfographicsListComponent } from './infographics-list/infographics-list.component';
import { AwardsListComponent } from './awards-list/awards-list.component';
import { TeamListComponent } from './team-list/team-list.component';
//TODO: FONTS AND ICONS
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    InfographicsListComponent,
    AwardsListComponent,
    TeamListComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {}
