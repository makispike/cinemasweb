import { Injectable } from '@angular/core';
import {Movie} from './movie';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {Version} from './version';
import {Genre} from './genre';
import {Location} from './location';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LocationserviceService {
  private locationsList: Location[];
  constructor(private httpClient: HttpClient) { }

  getAllLocations(): Observable<Location[]> {
    return this.httpClient.get<Location[]>('http://localhost:8080/location/all')
      .pipe(
        tap(_ => console.log('Fetched all locations' + _.entries())),
        catchError(this.handleError<Location[]>([]))
      );
  }

  getSingleLocation(id: number): Observable<Location[]> {
    return this.httpClient.get<Location[]>('http://localhost:8080/location/' + id)
      .pipe(
        tap(_ => console.log('Fetched location with id ' + id)),
        catchError(this.handleError<Location[]>([]))
      );
  }

  private handleError<T>(result?: T) {
    return (error: any): Observable<T> => {
      // show the error in the console
      console.error('Error calling the locations API: ' + error);
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
