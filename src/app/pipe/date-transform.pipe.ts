import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateTransform',
  standalone: true
})
export class DateTransformPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
