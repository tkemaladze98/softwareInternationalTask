import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateTransform',
  standalone: true
})
export class DateTransformPipe implements PipeTransform {

  public months: string[] = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ]
  transform(value: string, ...args: unknown[]): unknown {
    const regExp = /^(?:\d{4}-(?:(?:0[1-9]|1[0-2])(?:(?:[0-2][1-9]|\d{3})|(?:[3][01])) ביום )|(?:(?:0[1-9]|1[012])-(?:[0-2][1-9]|\d{3})|(?:[3][01]))|(?:\d{4}-(?:0[1-9]|1[012])-(?:0[1-9]|[12][0-9])))(?:T|\s)(?:[01][0-9]|2[0-3]):(?:[0-5][0-9]):(?:[0-5][0-9])\.(\d{7})Z$/;
    if (regExp.test(value)) {
      const dateValue = new Date(value);
      return `${(dateValue.getHours() < 10 ? '0' : '') + dateValue.getHours()}:${(dateValue.getMinutes() < 10 ? '0' : '') + dateValue.getMinutes()}:${(dateValue.getSeconds() < 10 ? '0' : '') + dateValue.getSeconds()} ${this.months[dateValue.getMonth()]} ${(dateValue.getDate() < 10 ? '0' : '') + dateValue.getDate()} ${dateValue.getFullYear()}`;
    } else {
      return value;
    }
  }

}
