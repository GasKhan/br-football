import { Component } from '@angular/core';
import {
  FlatpickrDirective,
  provideFlatpickrDefaults,
} from 'angularx-flatpickr';
import { GameApiService } from '../game-page/gameApi.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { GameDate } from '../shared/types/types';
import { FlatPickrOutputOptions } from 'angularx-flatpickr/lib/flatpickr.directive';
import { Router } from '@angular/router';

@Component({
  selector: 'app-games-calendar',
  standalone: true,
  imports: [FlatpickrDirective],
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
  templateUrl: './games-calendar.component.html',
  styleUrl: './games-calendar.component.css',
})
export class GamesCalendarComponent {
  gameDates: GameDate[] = [];
  multiDates: string[] = [];

  onDateSelected(e: FlatPickrOutputOptions) {
    console.log('Selected date is ' + e.dateString);
    const selectedDate = this.gameDates.find(
      (gameDate) => gameDate.createdAt.split('T')[0] === e.dateString
    );

    if (selectedDate) this.router.navigate(['admin', 'game', selectedDate.id]);
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
