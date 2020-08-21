import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MoviesListComponent} from './movies-list/movies-list.component';
import {MovieComponent} from './movie/movie.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ScreeningsListComponent} from './screenings-list/screenings-list.component';
import {ScreeningComponent} from './screening/screening.component';
import {HomeComponent} from './home/home.component';
import {SearchComponent} from './search/search.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LocationsComponent} from './locations/locations.component';
import {BuyComponent} from './buy/buy.component';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {OAuthModule} from 'angular-oauth2-oidc';
import {ProfileComponent} from './profile/profile.component';
import {AdminComponent} from './admin/admin.component';
import {RedirectedComponent} from './redirected/redirected.component';
import {AuthGuard} from './services/authguard.service';
import {UserService} from './services/user.service';
import {BuyService} from './services/buy.service';

@NgModule({
  declarations: [
    AppComponent,
    MoviesListComponent,
    MovieComponent,
    ScreeningsListComponent,
    ScreeningComponent,
    HomeComponent,
    SearchComponent,
    LocationsComponent,
    BuyComponent,
    ProfileComponent,
    AdminComponent,
    RedirectedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule,
    TranslateModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      defaultLanguage: 'en'
    }),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    OAuthModule.forRoot({
      resourceServer: {
        sendAccessToken: true
      }
    })
  ],
  providers: [AuthGuard, UserService, BuyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
