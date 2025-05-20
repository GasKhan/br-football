import { Routes } from '@angular/router';

import { MainPageComponent } from './main-page/main-page.component';
import { gamePageResolver } from './game-page/game.resolver';
import { createTeamsGuard } from './create-teams/create-teams.guard';
import { NotFoundComponent } from './not-found/not-found.component';

import { AdminPageResolver } from './admin-page/admin-page.resolver';

//TODO: fix logging out with working game page resolver
export const routes: Routes = [
  {
    path: 'admin',
    loadComponent: () =>
      import('./admin-page/admin-page.component').then(
        (m) => m.AdminPageComponent
      ),
    resolve: { players: AdminPageResolver },
    children: [
      {
        path: 'players',
        loadComponent: () =>
          import('./players-page/players-page.component').then(
            (m) => m.PlayersPageComponent
          ),
      },
      {
        path: 'create-teams',
        loadComponent: () =>
          import('./create-teams/create-teams.component').then(
            (m) => m.CreateTeamsComponent
          ),
        canActivate: [createTeamsGuard],
      },
      {
        path: 'game',
        loadComponent: () =>
          import('./game-page/game-page.component').then(
            (m) => m.GamePageComponent
          ),
        resolve: { gameData: gamePageResolver },
      },
      {
        path: 'game/:id',
        loadComponent: () =>
          import('./game-page/game-page.component').then(
            (m) => m.GamePageComponent
          ),

        resolve: { gameData: gamePageResolver },
      },
    ],
  },
  {
    path: 'ratings',
    loadComponent: () =>
      import('./ratings-page/ratings-page.component').then(
        (m) => m.RatingsPageComponent
      ),
  },
  { path: '', component: MainPageComponent },
  { path: '**', component: NotFoundComponent },
];
