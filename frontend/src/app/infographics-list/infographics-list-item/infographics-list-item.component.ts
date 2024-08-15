import { Component, Input } from '@angular/core';
import { PlayerInfo } from '../infographics-list.component';

@Component({
  selector: 'app-infographics-list-item',
  standalone: true,
  imports: [],
  templateUrl: './infographics-list-item.component.html',
  styleUrl: './infographics-list-item.component.css',
})
export class InfographicsListItemComponent {
  @Input() playerData!: PlayerInfo;
}
