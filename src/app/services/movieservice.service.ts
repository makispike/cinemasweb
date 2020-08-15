import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Movie} from './movie';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MovieserviceService {
  private movieList: Movie[];
  singleMovie: any = [];
  movies = [
    {
      id: '1',
      title: 'Pulp Fiction',
      description: 'lol',
      genres: ['action', 'romance'],
      versions: ['VOST', 'VF'],
      locations: ['Antwerpen', 'Hasselt'],
    }
  ];

  constructor(private httpClient: HttpClient) {
  }

  getAllMoviesFromServerOld() {
    this.httpClient
      .get<Movie[]>('http://localhost:8080/movies/all')
      .subscribe(
        (response) => {
          this.movieList = response;
          console.log(this.movieList);
        },
        (error) => {
          this.handleError(error);
        }
      );
  }

  getAllMovies(): Observable<Movie[]> {
    return this.httpClient.get<Movie[]>('http://localhost:8080/movies/all')
      .pipe(
        tap(_ => console.log('Fetched all movies' + _.entries())),
        catchError(this.handleError<Movie[]>([]))
      );
  }

  getSingleMovie(id: number): Observable<Movie[]> {
    return this.httpClient.get<Movie[]>('http://localhost:8080/movies/' + id)
      .pipe(
        tap(_ => console.log('Fetched movie with id ' + id)),
        catchError(this.handleError<Movie[]>([]))
      );
  }


  getSingleMovieFromServer(id: string) {
    this.httpClient
      .get<any[]>('http://localhost:8080/movies/' + id)
      .subscribe(
        (response) => {
          this.singleMovie = response;
          console.log(response);
        },
        (error) => {
          this.handleError(error);
        }
      );
  }

  private handleError<T>(result?: T) {
    return (error: any): Observable<T> => {
      // show the error in the console
      console.error('Error calling the screenings API: ' + error);

      // return empty result.
      return of(result as T);
    };
  }

}
