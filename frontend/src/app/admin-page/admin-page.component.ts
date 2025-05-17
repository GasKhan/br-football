import { Component, OnInit } from '@angular/core';
import {
  FlatpickrDirective,
  provideFlatpickrDefaults,
} from 'angularx-flatpickr';
import { GameApiService } from '../game-page/gameApi.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable, take } from 'rxjs';
import { GameDate } from '../shared/types/types';
import { FormsModule } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { FlatPickrOutputOptions } from 'angularx-flatpickr/lib/flatpickr.directive';

@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [FormsModule, FlatpickrDirective, RouterLink, RouterOutlet],
  providers: [
    provideFlatpickrDefaults({
      dateFormat: 'Y-m-d',
      altInput: true,
      altFormat: 'F j, Y',
      inline: true,
      locale: {
        firstDayOfWeek: 1,
      },
    }),
  ],
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.css',
})
//TODO: Create a resolver to fetch game dates instead of OnInit
export class AdminPageComponent {
  gameDates: GameDate[] = [];
  multiDates: string[] = [];

  onDateSelected(e: FlatPickrOutputOptions) {
    console.log('Selected date is ' + e.dateString);
    const selectedDate = this.gameDates.find(
      (gameDate) => gameDate.createdAt.split('T')[0] === e.dateString
    );

    if (selectedDate) this.router.navigate(['game', selectedDate.id]);
  }

  constructor(private gameApiService: GameApiService, private router: Router) {
    this.gameApiService
      .getGameDates()
      .pipe(takeUntilDestroyed())
      .subscribe((gameDates) => {
        this.gameDates = gameDates;
        this.multiDates = gameDates.map((gameDate) => gameDate.createdAt);
      });
  }
}
