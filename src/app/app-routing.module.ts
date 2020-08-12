import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MoviesListComponent} from './movies-list/movies-list.component';
import {ScreeningsListComponent} from './screenings-list/screenings-list.component';
import {HomeComponent} from './home/home.component';
import {SearchComponent} from './search/search.component';
import {LocationsComponent} from './locations/locations.component';

const routes: Routes = [
  { path: 'movies', component: MoviesListComponent },
  { path: 'screenings', component: ScreeningsListComponent},
  { path: 'search', component: SearchComponent},
  { path: 'locations', component: LocationsComponent},
  { path: 'home', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
