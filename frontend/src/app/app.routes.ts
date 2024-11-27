import { Routes } from '@angular/router';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { GamePageComponent } from './pages/game-page/game-page.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { adminPageResolver } from './pages/admin-page/resolvers/admin-page.resolver';

export const routes: Routes = [
  {
    path: 'admin',
    // resolve: { ratings: adminPageResolver },
    component: AdminPageComponent,
  },
  {
    path: 'game',
    component: GamePageComponent,
  },
  { path: '', component: MainPageComponent },
];
