import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {Location} from './models/location';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  constructor(private httpClient: HttpClient) { }

  getAllLocations(): Observable<Location[]> {
    return this.httpClient.get<Location[]>('http://localhost:8081/location/all')
      .pipe(
        tap(_ => console.log('Fetched all locations' + _.entries())),
        catchError(this.handleError<Location[]>([]))
      );
  }

  private handleError<T>(result?: T) {
    return (error: any): Observable<T> => {
      // show the error in the console
      console.error('Error calling the locations API: ' + error.message);
      // return empty result.
      return of(result as T);
    };
  }
}
