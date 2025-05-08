import { Component, OnInit } from '@angular/core';
import { RatingsService } from './ratings.service';
import { AsyncPipe } from '@angular/common';
import { ListItemColorDirective } from '../shared/list-item-color.directive';

@Component({
  selector: 'app-ratings-page',
  standalone: true,
  imports: [AsyncPipe, ListItemColorDirective],
  templateUrl: './ratings-page.component.html',
  styleUrl: './ratings-page.component.css',
})
export class RatingsPageComponent implements OnInit {
  ngOnInit(): void {
    this.ratingsService.getRatings();
  }
  constructor(protected ratingsService: RatingsService) {}
}
