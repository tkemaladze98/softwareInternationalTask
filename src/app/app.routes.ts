import { Routes } from '@angular/router';
import { FormComponent } from './components/form/form.component';
import { MoviesListComponent } from './components/movies-list/movies-list.component';
import { DateComponent } from './components/date/date.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { MatchComponent } from './components/match/match.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/form',
  },
  {
    path: 'form',
    component: FormComponent,
  },
  {
    path: 'movies',
    component: MoviesListComponent,
  },
  {
    path: 'date-transform',
    component: DateComponent,
  },
  {
    path: 'calendar',
    component: CalendarComponent,
  },
  {
    path: 'match-value',
    component: MatchComponent,
  },
];
