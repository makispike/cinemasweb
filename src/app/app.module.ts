import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MoviesListComponent } from './movies-list/movies-list.component';
import { MovieComponent } from './movie/movie.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import { ScreeningsListComponent } from './screenings-list/screenings-list.component';
import { ScreeningComponent } from './screening/screening.component';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import {FormsModule} from '@angular/forms';
import { LocationsComponent } from './locations/locations.component';

@NgModule({
  declarations: [
    AppComponent,
    MoviesListComponent,
    MovieComponent,
    ScreeningsListComponent,
    ScreeningComponent,
    HomeComponent,
    SearchComponent,
    LocationsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
