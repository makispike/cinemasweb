import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MoviesListComponent} from './movies-list/movies-list.component';
import {ScreeningsListComponent} from './screenings-list/screenings-list.component';
import {HomeComponent} from './home/home.component';
import {SearchComponent} from './search/search.component';
import {LocationsComponent} from './locations/locations.component';
import {BuyComponent} from './buy/buy.component';
import {RedirectedComponent} from './redirected/redirected.component';
import {ProfileComponent} from './profile/profile.component';
import {AdminComponent} from './admin/admin.component';
import {AuthGuard} from './services/authguard.service';

const routes: Routes = [
  { path: 'movies', component: MoviesListComponent },
  { path: 'screenings', component: ScreeningsListComponent},
  { path: 'search', component: SearchComponent},
  { path: 'locations', component: LocationsComponent},
  { path: 'buy', data: { roles: ['app-user'] }, canActivate: [AuthGuard], component: BuyComponent},
  { path: 'home', component: HomeComponent},
  { path: 'redirected', component: RedirectedComponent},
  { path: 'profile', data: { roles: ['app-user'] }, canActivate: [AuthGuard], component: ProfileComponent},
  { path: 'admin', data: { roles: ['app-admin'] }, canActivate: [AuthGuard], component: AdminComponent},
  { path: '', component: HomeComponent},
  { path: '**', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
