import { CommonModule } from '@angular/common';
import { Component, WritableSignal, signal } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  public activePage: WritableSignal<string> = signal(window.location.pathname);
  public routesData: Route[] = [
    {
      name: 'Form',
      path: '/form',
    },
    {
      name: 'Movies',
      path: '/movies',
    },
    {
      name: 'Date',
      path: '/date-transform',
    },
    {
      name: 'Calendar',
      path: '/calendar',
    },
    {
      name: 'Match',
      path: '/match-value',
    },
  ];

  constructor(private router: Router) {}

  public navigate(path: string): void {
    this.activePage.set(path);
    this.router.navigate([path]);
  }
}

interface Route {
  name: string;
  path: string;
}
