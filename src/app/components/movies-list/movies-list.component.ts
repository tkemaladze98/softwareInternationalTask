import { Component, OnDestroy, OnInit, WritableSignal, signal } from '@angular/core';
import { MoviesListService } from './movies-list.service';
import { Subject, takeUntil } from 'rxjs';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-movies-list',
  standalone: true,
  imports: [MatInputModule, MatFormField, CommonModule, MatButtonModule, MatCardModule, FormsModule],
  templateUrl: './movies-list.component.html',
  styleUrl: './movies-list.component.scss'
})
export class MoviesListComponent implements OnInit, OnDestroy {
  private subscription$: Subject<boolean> = new Subject<boolean>();
  public searchParam: WritableSignal<string> = signal('');
  public data: WritableSignal<any[]> = signal([]);
  public tableData: WritableSignal<any[]> = signal([]);
  public tableHeaders: WritableSignal<string[]> = signal(['title', 'titleType', 'season', 'episode', 'year', 'image']);


  constructor(private movieService: MoviesListService) { }
  ngOnInit(): void {
    this.getMovies();
  }

  public getMovies(forTable: boolean = false): void {
    const params = {
      limit: 20,
      paginationKey: 0,
      sortArg: 'moviemeter,asc',
      title: this.searchParam() || 'starwars'
    };
    this.movieService.getMovies(params).pipe(takeUntil(this.subscription$)).subscribe((res: any) => {
      if (forTable) {
        !this.searchParam() ? this.tableData.set([]) : this.tableData.set(res.results)

        //if want to change card data when search

        // this.data.set(res.results);
      } else {
        this.data.set(res.results);
      }
    });
  }

  public setSearchValue(event: Event) {
    this.searchParam.set((<HTMLInputElement>event.target).value);
  }

  ngOnDestroy(): void {
    this.subscription$.next(true);
    this.subscription$.unsubscribe();
  }
}
