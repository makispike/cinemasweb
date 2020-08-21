import {Component, OnInit} from '@angular/core';
import {IdentityClaims} from '../services/models/IdentityClaims';
import {OAuthService} from 'angular-oauth2-oidc';
import {UserService} from '../services/user.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  idClaims: IdentityClaims;
  checkUserSubscription: Subscription;
  registerUserSubscription: Subscription;
  authenticated = false;
  admin = false;
  userId = 0;

  constructor(private oAuthService: OAuthService, public userService: UserService) {
    this.checkAuthenticated();
  }

  ngOnInit(): void {
  }

  checkAuthenticated() {
    this.idClaims = JSON.parse(JSON.stringify(this.oAuthService.getIdentityClaims())); // map the object to a model so we can use the data

    if (this.idClaims === null) {
      this.authenticated = false;
      this.admin = false;
      localStorage.setItem('authenticated', '');
      localStorage.setItem('email', '');
      localStorage.setItem('admin', '');
      localStorage.setItem('userId', '');
      console.log('not logged in');

    }
    else if (this.idClaims.preferred_username !== null) {
      this.authenticated = true;
      localStorage.setItem('authenticated', '1');
      localStorage.setItem('email', this.idClaims.email);
      this.checkUserRegistered();
      this.userId = Number(localStorage.getItem('userId'));
      if (this.userId === 0 || this.userId === undefined) {
        this.registerNewUser();
        localStorage.setItem('userId', this.userId.toString());
      }

      if (this.checkAdmin()) {
        localStorage.setItem('admin', '1');
        console.log('logged in as an admin user');
        this.admin = true;
      }
      else {
        localStorage.setItem('admin', '0');
        console.log('logged in as a user');
        this.admin = false;
      }
    }
  }

  checkAdmin(): boolean {
    const jwt = this.oAuthService.getAccessToken();
    const jwtData = jwt.split('.')[1];
    const decodedJwtJsonData = window.atob(jwtData);
    console.log(decodedJwtJsonData);

    return JSON.stringify(JSON.parse(decodedJwtJsonData)).indexOf('app-admin') !== -1;
  }

  checkUserRegistered() {
    this.checkUserSubscription = this.userService.getUserByEmail(localStorage.getItem('email')).subscribe(
      fetchedUser => localStorage.setItem('userId', fetchedUser.userId.toString()));
  }

  registerNewUser() {
    this.registerUserSubscription = this.userService.registerUser(localStorage.getItem('email')).subscribe();
  }
}
