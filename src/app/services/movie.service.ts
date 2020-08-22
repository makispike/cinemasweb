import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Movie} from './models/movie';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {Version} from './models/version';
import {Genre} from './models/genre';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private httpClient: HttpClient) {
  }

  getAllMovies(): Observable<Movie[]> {
    return this.httpClient.get<Movie[]>('http://localhost:8081/movies/all')
      .pipe(
        tap(_ => console.log('Fetched all movies' + _.entries())),
        catchError(this.handleError<Movie[]>([]))
      );
  }

  private handleError<T>(result?: T) {
    return (error: any): Observable<T> => {
      // show the error in the console
      console.error('Error calling the movies API: ' + error);
      // return empty result.
      return of(result as T);
    };
  }

  joinAllVersionLabels(versions: Version[]): string {
    let concatFields = '';
    versions.forEach((version) => {
      if (concatFields === '') {
        concatFields = concatFields + version.versionLabel;
      } else {
        concatFields = concatFields + ', ' + version.versionLabel;
      }
    });
    return concatFields;
  }

  joinAllEnglishGenreLabels(genres: Genre[]): string {
    let concatFields = '';
    genres.forEach((genre) => {
      if (concatFields === '') {
        concatFields = concatFields + genre.genreLabelEN;
      } else {
        concatFields = concatFields + ', ' + genre.genreLabelEN;
      }
    });
    return concatFields;
  }

  joinAllFrenchGenreLabels(genres: Genre[]): string {
    let concatFields = '';
    genres.forEach((genre) => {
      if (concatFields === '') {
        concatFields = concatFields + genre.genreLabelFR;
      } else {
        concatFields = concatFields + ', ' + genre.genreLabelFR;
      }
    });
    return concatFields;
  }

  joinAllDutchGenreLabels(genres: Genre[]): string {
    let concatFields = '';
    genres.forEach((genre) => {
      if (concatFields === '') {
        concatFields = concatFields + genre.genreLabelNL;
      } else {
        concatFields = concatFields + ', ' + genre.genreLabelNL;
      }
    });
    return concatFields;
  }
}
