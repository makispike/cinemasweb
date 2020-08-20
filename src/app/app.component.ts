import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {AuthConfig, NullValidationHandler, OAuthService} from 'angular-oauth2-oidc';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Cinepolis';
  languageInUse = 'en';
  admin: string;
  loggedIn = false;
  authConfig: AuthConfig = {
    issuer: 'http://localhost:8080/auth/realms/cinemas',
    redirectUri: window.location.origin + '/redirected',
    clientId: 'cinemas-frontend',
    scope: 'openid profile email offline_access roles',
    responseType: 'code',
    // at_hash is not present in JWT token
    disableAtHashCheck: true,
    showDebugInformation: true
  };

  constructor(private translate: TranslateService, private oauthService: OAuthService) {
    translate.setDefaultLang('en');
    this.configureAuthentication();
  }

  changeLanguage(language: string) {
    this.translate.use(language);
    this.languageInUse = language;
  }

  public login() {
    this.oauthService.initLoginFlow();
  }

  public logoff() {
    this.oauthService.logOut();
  }

  private configureAuthentication() {
    this.oauthService.configure(this.authConfig);
    this.oauthService.tokenValidationHandler = new NullValidationHandler();
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }

  public isAuthenticated(): boolean {
    if (localStorage.getItem('authenticated') === '1') {
      return true;
    } else {
      return false;
    }
  }

  public isAdministrator(): boolean {
    if (localStorage.getItem('admin') === '1') {
      return true;
    } else {
      return false;
    }
  }
}
