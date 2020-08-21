import {Component, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';
import {User} from '../services/models/user';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Reservation} from '../services/models/reservations';
import {stringify} from '@angular/compiler/src/util';
import {AppComponent} from '../app.component';
import {Subscription} from 'rxjs';
import {Movie} from '../services/models/movie';
import {HttpClient} from '@angular/common/http';
import {catchError} from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User;
  success: boolean;
  userId: number;
  userEmail: string;
  userFirstName: string;
  userLastName: string;
  userContactEmail: string;
  userAddress: string;
  reservations: Reservation[] = [];
  movies: Movie[] = [];

  constructor(public userService: UserService, private appComponent: AppComponent, private http: HttpClient) {
    this.getUserData();
    this.initUser();
    this.initReservations();
  }

  ngOnInit(): void {
  }

  getUserData(): void {
    const userId = Number(localStorage.getItem('userId'));
    this.userService.getReservationTicketsByByUserId(userId)
      .subscribe(reservation => {
        localStorage.setItem('AllReservations', JSON.stringify(reservation));
      });
    this.userService.getUserById(userId).subscribe(userFetched => {
      this.userLastName = userFetched.userLastName;
      localStorage.setItem('userFirstName', userFetched.userFirstName);
      localStorage.setItem('userLastName', userFetched.userLastName);
      localStorage.setItem('userContactEmail', userFetched.userContactEmail);
      localStorage.setItem('userAddress', userFetched.userAddress);
      localStorage.setItem('reservations', JSON.stringify(userFetched.reservations));
      }
    );
  }


  initUser() {
    this.userFirstName = localStorage.getItem('userFirstName');
    this.userLastName = localStorage.getItem('userLastName');
    this.userContactEmail = localStorage.getItem('userContactEmail');
    this.userAddress = localStorage.getItem('userAddress');
    this.userEmail = localStorage.getItem('email');
    this.userId = Number(localStorage.getItem('userId'));
  }

  async initReservations() {
    this.reservations = await this.http.get<Reservation[]>('http://localhost:8081/reservation/user/' + this.userId).toPromise();
    let i = 0;
    for (const reservation of this.reservations) {
      this.movies.push(this.reservations[i].tickets[0].screening.movie);
      i++;
    }
  }

  async onSubmit() {
    this.user = {
      userId: Number(localStorage.getItem('userId')),
      userEmail: localStorage.getItem('email'),
      userLastName: this.userLastName,
      userFirstName: this.userFirstName,
      userAddress: this.userAddress,
      userContactEmail: this.userContactEmail,
      reservations: null
    };
    const response = await this.http.put<User>('http://localhost:8081/user/update', this.user).toPromise();
    if (response !== null && response !== undefined) {
      this.success = true;
    }
    console.log(response);
  }
  getLanguageInUse(): string {
    return this.appComponent.languageInUse;
  }

}
