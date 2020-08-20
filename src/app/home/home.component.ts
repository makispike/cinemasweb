import {Component, OnInit} from '@angular/core';
import {IdentityClaims} from '../services/models/IdentityClaims';
import {OAuthService} from 'angular-oauth2-oidc';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  idClaims: IdentityClaims;
  authenticated = false;
  admin = false;

  constructor(private oAuthService: OAuthService) {
    this.checkAuthenticated();
  }

  ngOnInit(): void {
  }

  checkAuthenticated() {
    this.idClaims = JSON.parse(JSON.stringify(this.oAuthService.getIdentityClaims()));
    console.log(this.idClaims);

    if (this.idClaims === null) {
      this.authenticated = false;
      this.admin = false;
      localStorage.setItem('authenticated', '');
      localStorage.setItem('email', '');
      localStorage.setItem('admin', '');

      console.log('not logged in');
    } else if (this.idClaims.preferred_username !== null) {
      this.authenticated = true;
      localStorage.setItem('authenticated', '1');
      localStorage.setItem('email', this.idClaims.email);

      if (this.checkAdmin()) {
        localStorage.setItem('admin', '1');
        console.log('logged in as an admin user');
        this.admin = true;
      } else {
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
}
