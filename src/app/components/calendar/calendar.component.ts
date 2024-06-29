import { NgClass } from '@angular/common';
import { Component, OnInit, WritableSignal, signal } from '@angular/core';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [NgClass],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})
export class CalendarComponent implements OnInit {
  public currentMonthDays: WritableSignal<Date[]> = signal([]);
  public today: Date = new Date();
  public weekDays: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  public monthNames: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  constructor() { }

  ngOnInit(): void {
    this.currentMonthDays.set(this.getCalendarArray());
  }

  public getCalendarArray(): Date[] {
    let prevMonthNeed: boolean = false;
    let nextMonthNeed: boolean = false;
    let currentMonth: Date[] = [];
    const currentMontLastDay = new Date(this.today.getFullYear(), this.today.getMonth() + 1, 0).getDate();
    for (let i = 1; i <= currentMontLastDay; i++) {
      const date = new Date(this.today.getFullYear(), this.today.getMonth(), i);
      if (i === 1 && date.getDay() > 0) {
        prevMonthNeed = true;
      }
      if (i === currentMontLastDay && date.getDay() < 6) {
        nextMonthNeed = true;
      }
      currentMonth.push(date);
    }
    let prevMonth: Date[] = prevMonthNeed ? this.getPrevMonthDays(currentMonth[0].getDay()) : [];
    let nextMonth: Date[] = nextMonthNeed ? this.getNextMonthDays(7 - currentMonth[currentMonth.length - 1].getDay()) : [];
    return [...prevMonth, ...currentMonth, ...nextMonth];
  }

  public getPrevMonthDays(length: number): Date[] {
    const prevMonthLastDay = new Date(this.today.getFullYear(), this.today.getMonth(), 0).getDate();
    const prevMonthDays: Date[] = [];
    for (let i = 0; i < length; i++) {
      const date = new Date(this.today.getFullYear(), this.today.getMonth() - 1, prevMonthLastDay - i);
      prevMonthDays.push(date);
    }
    return prevMonthDays.reverse();
  }

  public getNextMonthDays(length: number): Date[] {
    const nextMonthDays: Date[] = [];
    for (let i = 1; i < length; i++) {
      const date = new Date(this.today.getFullYear(), this.today.getMonth() + 1, i);
      nextMonthDays.push(date);
    }
    return nextMonthDays;
  }
}

