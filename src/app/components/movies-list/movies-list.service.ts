import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MoviesListService {
  public api = 'https://online-movie-database.p.rapidapi.com/title/v2/find'
  //
  constructor(private http: HttpClient) { }

  public getMovies(queryParams: any) {
    return this.http.get(this.api, { params: queryParams })
  }

}
