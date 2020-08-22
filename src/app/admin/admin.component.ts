import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Location} from '../services/models/location';
import {Screening} from '../services/models/screening';
import {Movie} from '../services/models/movie';
import {Venue} from '../services/models/venue';
import {Genre} from '../services/models/genre';
import {Version} from '../services/models/version';
import {Pricecategory} from '../services/models/pricecategory';
import {AppComponent} from '../app.component';
import {MovieService} from '../services/movie.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  locations: Location[] = [];
  location: Location;
  venues: Venue[] = [];
  venue: Venue;
  movies: Movie[] = [];
  movie: Movie;
  versions: Version[] = [];
  version: Version;
  genres: Genre[] = [];
  genre: Genre;
  priceCategories: Pricecategory[] = [];
  screenings: Screening[] = [];
  screening: Screening;
  selectedOption: string;
  selectedMovieOption: number;
  selectedLocationOption: number;
  selectedScreeningOption: number;
  selectedVenueOption: number;
  locationName: string;
  locationAddress: string;
  locationDescriptionFR: string;
  locationDescriptionNL: string;
  locationDescriptionEN: string;
  locationPhotoUrl: string;
  movieNameFR: string;
  movieNameNL: string;
  movieNameEN: string;
  movieDescriptionFR: string;
  movieDescriptionNL: string;
  movieDescriptionEN: string;
  moviePictureUrl: string;
  screeningDate: string;
  screeningTime: string;
  screeningMovie: Movie;
  screeningVersion: Version;
  screeningVenue: Venue;
  availableSeats: number;
  venueNumber: number;
  venueSeatsAmount: string;
  versionFR: boolean;
  versionNL: boolean;
  versionEN: boolean;
  versionVOST: boolean;
  comedy: boolean;
  romance: boolean;
  action: boolean;
  crime: boolean;
  horror: boolean;
  animation: boolean;
  adventure: boolean;
  scifi: boolean;
  scrVersionFR: boolean;
  scrVersionNL: boolean;
  scrVersionEN: boolean;
  scrVersionVOST: boolean;

  constructor(private http: HttpClient, private appComponent: AppComponent, private moviesService: MovieService) {
  }

  ngOnInit(): void {
    this.initAllCollections();
    this.initAllValues();
  }

  onChangeOptionSelection() {
    if (this.selectedMovieOption > -1) {
      this.initAllValues();
    }
    this.selectedMovieOption = -1;
    this.selectedLocationOption = -1;
    this.selectedScreeningOption = -1;
    this.selectedVenueOption = -1;
  }

  onChangeSelectedLocation() {
    if (this.selectedLocationOption > -1) {
      if (this.selectedLocationOption !== null && this.selectedLocationOption !== undefined && this.location !== undefined
        && this.location.venues !== undefined && this.location.venues !== null) {
      } else {
        this.location = this.locations[this.selectedLocationOption];
        this.locationName = this.location.locationName;
        this.locationAddress = this.location.locationAddress;
        this.locationDescriptionEN = this.location.locationDescriptionEN;
        this.locationDescriptionFR = this.location.locationDescriptionFR;
        this.locationDescriptionNL = this.location.locationDescriptionNL;
        this.locationPhotoUrl = this.location.locationPhotoUrl;
        this.venues = this.location.venues;
      }
    } else {
      this.initAllValues();
      this.locationDescriptionEN = null;
      this.locationDescriptionFR = null;
      this.locationDescriptionNL = null;
    }
  }

  onChangeLocationForScreening() {
    this.venues = this.locations[this.selectedLocationOption].venues;
  }

  onChangeSelectedScreening() {
    this.initAllValues();
    if (this.selectedScreeningOption > -1) {
      if (this.selectedScreeningOption !== null && this.selectedScreeningOption !== undefined && this.screening !== undefined
        && this.screening.version === undefined && this.screening.venue === null) {
      } else {
        this.screening = this.screenings[this.selectedScreeningOption];
        this.screeningDate = this.screening.screeningDate;
        this.screeningTime = this.screening.screeningTime;
        this.screeningMovie = this.screening.movie;
        this.screeningVersion = this.screening.version;
        this.screeningVenue = this.screening.venue;
        this.checkGenresAndVersions(this.movie);
      }
    }
  }

  onChangeSelectedMovie() {
    this.initAllValues();
    if (this.selectedMovieOption > -1) {
      if (this.selectedMovieOption !== null && this.selectedMovieOption !== undefined && this.movie !== undefined
        && this.movie.versions !== undefined && this.movie.versions !== null) {
      } else {
        this.movie = this.movies[this.selectedMovieOption];
        this.movieNameFR = this.movie.movieNameFR;
        this.movieNameNL = this.movie.movieNameNL;
        this.movieNameEN = this.movie.movieNameEN;
        this.moviePictureUrl = this.movie.moviePictureUrl;
        this.movieDescriptionFR = this.movie.movieDescriptionFR;
        this.movieDescriptionNL = this.movie.movieDescriptionNL;
        this.movieDescriptionEN = this.movie.movieDescriptionEN;
        this.checkGenresAndVersions(this.movie);
      }
    } else {
      this.movieDescriptionFR = null;
      this.movieDescriptionNL = null;
      this.movieDescriptionEN = null;
    }
  }

  movieHasVersion(versionLabel: string): boolean {
    if (this.selectedMovieOption !== null && this.selectedMovieOption !== undefined && this.movie !== undefined
      && this.movie.versions !== undefined && this.movie.versions !== null) {
      return this.moviesService.joinAllVersionLabels(this.movie.versions).includes(versionLabel);
    }
    return false;
  }

  screeningHasVersion(versionLabel: string): boolean {
    if (this.selectedScreeningOption !== null && this.selectedScreeningOption !== undefined && this.screening !== undefined
      && this.screening.version !== undefined && this.screening.version !== null) {
      return this.screening.version.versionLabel.includes(versionLabel);
    }
    return false;
  }

  movieHasGenre(genreLabel: string): boolean {
    if (this.movie !== undefined && this.movie.genres !== undefined && this.movie.genres !== null) {
      if (this.getLanguageInUse() === 'en') {
        return this.moviesService.joinAllEnglishGenreLabels(this.movie.genres).includes(genreLabel);
      } else if (this.getLanguageInUse() === 'fr') {
        return this.moviesService.joinAllFrenchGenreLabels(this.movie.genres).includes(genreLabel);
      } else if (this.getLanguageInUse() === 'nl') {
        return this.moviesService.joinAllDutchGenreLabels(this.movie.genres).includes(genreLabel);
      }
    }
    return false;
  }

  async onSubmitMovie() {
    console.log(this.selectedMovieOption);
    if (this.selectedMovieOption > -1) {
      await this.putMovie();
    } else {
      await this.postMovie();
    }
  }

  async onSubmitScreening() {
    const screening = this.createScreening();
    if (this.selectedScreeningOption > -1) {
      console.log(JSON.stringify(screening));
      await this.putScreening();
    } else {
      console.log(JSON.stringify(screening));
      await this.postScreening();
    }
  }

  async onSubmitLocation() {
    if (this.selectedLocationOption > -1) {
      await this.putLocation();
    } else {
      await this.postLocation();
    }
  }

  initAllCollections() {
    this.getAllLocations();
    this.getAllMovies();
    this.getAllScreenings();
    console.log(this.locations);
    console.log(this.movies);
    console.log(this.screenings);
  }

  async getAllLocations() {
    this.locations = await this.http.get<Location[]>('http://localhost:8081/location/all').toPromise();
    console.log(this.locations);
  }

  async putLocation() {
    const location = this.createLocation();
    console.log(JSON.stringify(location));
    const response = await this.http.put<Location>('http://localhost:8081/location/update', location).toPromise();
  }

  async postLocation() {
    const location = this.createLocation();
    console.log(JSON.stringify(location));
    const response = await this.http.post<Location>('http://localhost:8081/location/new', location).toPromise();
  }

  async getAllMovies() {
    this.movies = await this.http.get<Movie[]>('http://localhost:8081/movies/all').toPromise();
  }

  async putMovie() {
    const movie = this.createMovie();
    console.log(JSON.stringify(movie));
    const response = await this.http.put<Movie>('http://localhost:8081/movies/update', movie).toPromise();
    console.log(response);
  }

  async postMovie() {
    const movie = this.createMovie();
    console.log(JSON.stringify(movie));
    const response = await this.http.post<Movie>('http://localhost:8081/movies/create', movie).toPromise();
    console.log(response);
  }

  async getAllScreenings() {
    this.screenings = await this.http.get<Screening[]>('http://localhost:8081/screening/all').toPromise();
    console.log(this.screenings);
  }

  async putScreening() {
    const screening = this.createScreening();
    const response = await this.http.put<Screening>('http://localhost:8081/screening/update', screening).toPromise();
  }

  async postScreening() {
    const screening = this.createScreening();
    const response = await this.http.post<Screening>('http://localhost:8081/screening/new', screening).toPromise();
  }

  initAllValues() {
    this.resetLocation();
    this.resetMovie();
    this.resetScreening();
    this.resetVenue();
    this.resetGenre();
    this.resetVersion();
  }

  resetLocation() {
    this.location = {
      locationId: 0,
      locationName: '',
      locationAddress: '',
      locationDescriptionFR: '',
      locationDescriptionNL: '',
      locationDescriptionEN: '',
      locationPhotoUrl: '',
      venues: null,
      priceCategories: null,
    };
  }

  createLocation(): Location {
    let location: Location;
    location = {
      locationId: (this.selectedLocationOption >= 0) ? this.location.locationId : null,
      locationName: this.locationName,
      locationAddress: this.locationAddress,
      locationDescriptionFR: this.locationDescriptionFR,
      locationDescriptionNL: this.locationDescriptionNL,
      locationDescriptionEN: this.locationDescriptionEN,
      locationPhotoUrl: this.locationPhotoUrl,
      venues: (this.selectedLocationOption >= 0) ? this.location.venues : null,
      priceCategories: (this.selectedLocationOption >= 0) ? this.location.priceCategories : null,
    };
    return location;
  }

  resetMovie() {
    this.movie = {
      movieId: 0,
      movieNameFR: '',
      movieNameNL: '',
      movieNameEN: '',
      movieDescriptionFR: '',
      movieDescriptionNL: '',
      movieDescriptionEN: '',
      moviePictureUrl: '',
      genres: null,
      versions: null,
      screenings: null
    };
  }

  createMovie(): Movie {
    let movie: Movie;
    movie = {
      movieId: (this.selectedMovieOption >= 0) ? this.movie.movieId : null,
      movieNameFR: this.movieNameFR,
      movieNameNL: this.movieNameNL,
      movieNameEN: this.movieNameEN,
      movieDescriptionFR: this.movieDescriptionFR,
      movieDescriptionNL: this.movieDescriptionNL,
      movieDescriptionEN: this.movieDescriptionEN,
      moviePictureUrl: this.moviePictureUrl,
      genres: this.getGenres(),
      versions: this.getVersions(),
      screenings: (this.selectedMovieOption >= 0) ? this.movie.screenings : null
    };
    return movie;
  }

  resetScreening() {
    this.screening = {
      screeningId: 0,
      screeningDate: '',
      screeningTime: '',
      availableSeats: 0,
      venue: null,
      movie: null,
      version: null
    };
  }

  createScreening(): Screening {
    let screening: Screening;
    screening = {
      screeningId: (this.selectedScreeningOption >= 0) ? this.screening.screeningId : null,
      screeningDate: this.screeningDate,
      screeningTime: this.screeningTime,
      availableSeats: this.availableSeats,
      venue: (this.selectedScreeningOption >= 0) ? this.screening.venue : this.venues[this.selectedVenueOption],
      movie: (this.selectedScreeningOption >= 0) ? this.screening.movie : this.movies[this.selectedMovieOption],
      version: (this.selectedScreeningOption >= 0) ? this.screening.version : this.getScreeningVersion(),
    };
    return screening;
  }

  resetVenue() {
    this.venue = {
      venueId: 0,
      venueNumber: 0,
      venueSeatsAmount: 0,
      screenings: null,
      location: null,
    };
  }

  resetGenre() {
    this.genre = {
      genreId: 0,
      genreLabelFR: '',
      genreLabelNL: '',
      genreLabelEN: '',
    };
  }

  getGenres(): Genre[] {
    const genres: Genre[] = [];
    if (this.romance) {
      genres.push({
        genreId: 1,
        genreLabelFR: 'Romance',
        genreLabelNL: 'Romance',
        genreLabelEN: 'Romance',
      });
    }
    if (this.action) {
      genres.push({
        genreId: 2,
        genreLabelFR: 'Action',
        genreLabelNL: 'Actie',
        genreLabelEN: 'Action',
      });
    }
    if (this.comedy) {
      genres.push({
        genreId: 3,
        genreLabelFR: 'Comedy',
        genreLabelNL: 'Comédie',
        genreLabelEN: 'Comedy',
      });
    }
    if (this.horror) {
      genres.push({
        genreId: 4,
        genreLabelFR: 'Horreur',
        genreLabelNL: 'Horror',
        genreLabelEN: 'Horror',
      });
    }
    if (this.crime) {
      genres.push({
        genreId: 5,
        genreLabelFR: 'Crime',
        genreLabelNL: 'Crime',
        genreLabelEN: 'Crime',
      });
    }
    if (this.animation) {
      genres.push({
        genreId: 6,
        genreLabelFR: 'Animation',
        genreLabelNL: 'Animatie',
        genreLabelEN: 'Animation',
      });
    }
    if (this.adventure) {
      genres.push({
        genreId: 7,
        genreLabelFR: 'Aventure',
        genreLabelNL: 'Avontuur',
        genreLabelEN: 'Adventure',
      });
    }
    if (this.scifi) {
      genres.push({
        genreId: 8,
        genreLabelFR: 'Science-fiction',
        genreLabelNL: 'Scifi',
        genreLabelEN: 'Scifi',
      });
    }
    return genres;
  }

  resetVersion() {
    this.version = {
      versionId: 0,
      versionLabel: '',
    };
  }

  getVersions(): Version[] {
    const versions: Version[] = [];
    if (this.versionEN) {
      versions.push({
        versionId: 1,
        versionLabel: 'EN',
      });
    }
    if (this.versionFR) {
      versions.push({
        versionId: 2,
        versionLabel: 'FR',
      });
    }
    if (this.versionNL) {
      versions.push({
        versionId: 3,
        versionLabel: 'NL',
      });
    }
    if (this.versionVOST) {
      versions.push({
        versionId: 4,
        versionLabel: 'VOST',
      });
    }
    return versions;
  }

  getScreeningVersion(): Version {
    let version: Version;
    if (this.scrVersionEN) {
      version = {
        versionId: 1,
        versionLabel: 'EN',
      };
    } else if (this.scrVersionFR) {
      version = {
        versionId: 2,
        versionLabel: 'FR',
      };
    } else if (this.scrVersionNL) {
      version = {
        versionId: 3,
        versionLabel: 'NL',
      };
    } else if (this.scrVersionVOST) {
      version = {
        versionId: 4,
        versionLabel: 'VOST',
      };
    }
    return version;
  }

  checkGenresAndVersions(movie: Movie) {
    this.versionFR = this.movieHasVersion('FR');
    this.versionNL = this.movieHasVersion('NL');
    this.versionEN = this.movieHasVersion('EN');
    this.versionVOST = this.movieHasVersion('VOST');
    this.comedy = this.movieHasGenre('Comedy');
    this.romance = this.movieHasGenre('Romance');
    this.action = this.movieHasGenre('Action');
    this.crime = this.movieHasGenre('Crime');
    this.horror = this.movieHasGenre('Horror');
    this.animation = this.movieHasGenre('Animation');
    this.adventure = this.movieHasGenre('Adventure');
    this.scifi = this.movieHasGenre('Scifi');
  }

  getLanguageInUse(): string {
    return this.appComponent.languageInUse;
  }

}
