import { Component, OnInit } from '@angular/core';
import { RatingsService } from './ratings.service';
import { AsyncPipe } from '@angular/common';
import { ListItemColorDirective } from '../shared/list-item-color.directive';
import { Months } from '../shared/types/enums';

@Component({
  selector: 'app-ratings-page',
  standalone: true,
  imports: [AsyncPipe, ListItemColorDirective],
  templateUrl: './ratings-page.component.html',
  styleUrl: './ratings-page.component.css',
})
export class RatingsPageComponent implements OnInit {
  readonly lastMonth = Months[new Date().getMonth() - 1];

  ngOnInit(): void {
    this.ratingsService.getRatings();
  }
  constructor(protected ratingsService: RatingsService) {}
}
