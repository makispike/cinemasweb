import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MoviesListComponent} from './movies-list/movies-list.component';
import {ScreeningsListComponent} from './screenings-list/screenings-list.component';
import {HomeComponent} from './home/home.component';

const routes: Routes = [
  { path: 'movies', component: MoviesListComponent },
  { path: 'screenings', component: ScreeningsListComponent},
  { path: 'home', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
