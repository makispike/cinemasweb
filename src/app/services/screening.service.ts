import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {Screening} from './models/screening';

@Injectable({
  providedIn: 'root'
})
export class ScreeningService {
  constructor(private httpClient: HttpClient) { }

  getAllScreeningsFromServer() {
    this.httpClient
      .get<any[]>('http://localhost:8081/screening/')
      .subscribe(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.log('Error calling the screenings API: ' + error);
        }
      );
  }

  getAllScreenings(): Observable<Screening[]> {
    return this.httpClient.get<Screening[]>('http://localhost:8081/screening/all')
      .pipe(
        tap(_ => console.log('Fetched all screenings' + _.entries())),
        catchError(this.handleError<Screening[]>([]))
      );
  }

  getAllScreeningsByDate(date: string): Observable<Screening[]> {
    return this.httpClient.get<Screening[]>('http://localhost:8081/screening/bydate/' + date)
      .pipe(
        tap(_ => console.log('Fetched all screenings by date' + _.entries())),
        catchError(this.handleError<Screening[]>([]))
      );
  }

  getSingleScreening(id: number): Observable<Screening> {
    return this.httpClient.get<Screening>('http://localhost:8081/screening/' + id)
      .pipe(
        tap(_ => console.log('Fetched screening with id ' + id)),
        catchError(this.handleError<Screening>())
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
