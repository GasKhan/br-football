import { Directive, ElementRef, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[appListItemColor]',
  standalone: true,
})
export class ListItemColorDirective {
  @Input('appListItemColor') itemIndex = 0;

  @HostBinding('style.background-color') get bgColor() {
    return this.itemIndex % 2 === 0 ? '#bed3ff' : '#86b1ff';
  }
}
