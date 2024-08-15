import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  telegram = '#'; //https://t.me/
  fieldLocation = '#'; //https://yandex.ru/maps/?text=
  fieldNumber = '#'; //tel:+***
}
