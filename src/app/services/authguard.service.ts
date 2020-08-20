import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {OAuthService} from 'angular-oauth2-oidc';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    protected readonly router: Router,
    protected readonly oAuthService: OAuthService) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (localStorage.getItem('authenticated') === '1') {
      // Get the roles required from the route.
      const requiredRoles = route.data.roles;

      // Allow the user to to proceed if no additional roles are required to access the route.
      if (!(requiredRoles instanceof Array) || requiredRoles.length === 0) {
        return true;
      }

      // Decode the user's token so we can check what's in it
      const jwt = this.oAuthService.getAccessToken();
      const jwtData = jwt.split('.')[1];
      const decodedJwtJsonData = window.atob(jwtData);
      const roles = JSON.stringify(JSON.parse(decodedJwtJsonData));

      // Allow the user to proceed if all the required roles are present.
      if (requiredRoles.every((role) => roles.includes(role))) {
        return true;
      } else {
        console.log('Insufficient rights for accessing this route, redirecting to Home');
        this.router.navigate(['/home']);
      }
    } else {
      console.log('Tried to access route without being authenticated');
      this.oAuthService.initLoginFlow();
    }
  }
}
