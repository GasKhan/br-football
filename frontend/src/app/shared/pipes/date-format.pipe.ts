import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat',
  standalone: true,
})
export class DateFormatPipe implements PipeTransform {
  transform(value: string | undefined): string | null {
    return value ? value.split('T')[0].split('-').reverse().join('-') : null;
  }
}
