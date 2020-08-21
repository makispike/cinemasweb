import {Injectable} from '@angular/core';
import {Observable, of, Subject} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {User} from './models/user';
import {IdentityClaims} from './models/IdentityClaims';
import {OAuthService} from 'angular-oauth2-oidc';
import {Reservation} from './models/reservations';
import {Screening} from './models/screening';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  serviceUrl = 'http://localhost:8081/user/';
  idClaims: IdentityClaims;
  constructor(private httpClient: HttpClient, private oAuthService: OAuthService) {
  }

  getAllUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>('http://localhost:8081/user/all')
      .pipe(
        tap(_ => console.log('Fetched all users' + _.entries())),
        catchError(this.handleError<User[]>([]))
      );
  }

  getUserByEmail(email: string): Observable<User> {
    const url = `${this.serviceUrl}byEmail/${email}`;
    return this.httpClient.get<User>(url).pipe(
      tap(_ => console.log(`fetched hero email=${email}`)),
      catchError(this.handleError<User>())
    );
  }

  getUserById(id: number): Observable<User> {
    const url = `${this.serviceUrl}${id}`;
    return this.httpClient.get<User>(url).pipe(
      tap(_ => console.log(`fetched hero id=${id}`)),
      catchError(this.handleError<User>())
    );
  }

  getReservationTicketsByByUserId(id: number): Observable<Reservation[]> {
    return this.httpClient.get<Reservation[]>('http://localhost:8081/reservation/user/' + id)
      .pipe(
        tap(_ => console.log('Fetched all screenings' + _.entries())),
        catchError(this.handleError<Reservation[]>([]))
      );
  }

  registerNewUser(email: string) {
    console.log('Registering new user with email ' + email);
    return this.httpClient.post(this.serviceUrl, {userEmail: email}).subscribe({
      next: data => console.log(data),
      error: error => console.error('There was an error registering the user: ', error)
    });
  }

  xxupdateUser(user: User): Observable<User> {
    return this.httpClient.put<User>(this.serviceUrl + 'update', user)
      .pipe(
        catchError(this.handleError(user))
      );
  }

  registerUser(email: string): Observable<User> {
    console.log('Registering new user with email ' + email);
    return this.httpClient.post<User>(this.serviceUrl + 'register', email).pipe(
      tap((newUser: User) => console.log(`Added user with=${newUser.userId}`)),
      catchError(this.handleError<User>())
    );
  }

  private handleError<T>(result?: T) {
    return (error: any): Observable<T> => {
      // show the error in the console
      console.error('Error calling the users API: ' + error);

      // return empty result.
      return of(result as T);
    };
  }
}
