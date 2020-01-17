import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({ name: 'dateTimeFormat' })
export class DateTimeFormatPipe extends DatePipe implements PipeTransform {
  transform(value: Date): any {
    let format = 'yyyy/MM/dd';
    const curDate = new Date();
    if (curDate.isSameDate(value)) {
      format = 'H:mm';
    } else if (curDate.isSameMonth(value)) {
      format = 'MMM dd';
    }
    return super.transform(value, format);
  }
}
