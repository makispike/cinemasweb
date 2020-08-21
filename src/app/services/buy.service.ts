import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {Screening} from './models/screening';
import {User} from './models/user';
import {Ticket} from './models/ticket';

@Injectable({
  providedIn: 'root'
})
export class BuyService {
  serviceUrl = 'http://localhost:8081/reservation';
  constructor(private httpClient: HttpClient) { }

  registerUser(tickets: Ticket[]): Observable<Ticket[]> {
    console.log(JSON.stringify(tickets));
    return this.httpClient.post(this.serviceUrl + '/create', tickets).pipe(
      tap((newTickets: Ticket[]) => console.log(`Added user with=${tickets}`)),
      catchError(this.handleError<Ticket[]>())
    );
  }

  registerTickets(tickets: Ticket[]): Observable<Ticket[]> {
    console.log('Registering new user with email ' + JSON.parse(JSON.stringify(tickets)));
    return this.httpClient.post<Ticket[]>(this.serviceUrl + '/create', JSON.parse(JSON.stringify(tickets))).pipe(
      tap((newUser: Ticket[]) => console.log(`Added user with=`)),
      catchError(this.handleError<Ticket[]>())
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
