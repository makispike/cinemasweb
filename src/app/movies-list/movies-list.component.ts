import {Component, OnInit} from '@angular/core';
import {MovieserviceService} from '../services/movieservice.service';
import {Movie} from '../services/movie';
import {Version} from '../services/version';
import {Genre} from '../services/genre';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css']
})
export class MoviesListComponent implements OnInit {
  moviesList: Movie[];
  constructor(private moviesService: MovieserviceService) { }

  ngOnInit(): void {
    this.fetchAllMovies();
  }

  fetchAllMovies(): void {
    this.moviesService.getAllMovies().subscribe(movies => this.moviesList = movies);
  }

  joinAllVersionLabels(versions: Version[]): string {
    let concatFields = '';
    versions.forEach((version) => {
      if (concatFields === '') {
        concatFields = concatFields + version.versionLabel;
      } else {
        concatFields = concatFields + ', ' + version.versionLabel;
      }
      console.log(version.versionLabel);
    });
    return concatFields;
  }

  joinAllEnglishGenreLabels(genres: Genre[]): string {
    let concatFields = '';
    genres.forEach((genre) => {
      if (concatFields === '') {
        concatFields = concatFields + genre.genreLabelEN;
      } else {
        concatFields = concatFields + ', ' + genre.genreLabelEN;
      }
      console.log(genre.genreLabelEN);
    });
    return concatFields;
  }

  joinAllFrenchGenreLabels(genres: Genre[]): string {
    let concatFields = '';
    genres.forEach((genre) => {
      if (concatFields === '') {
        concatFields = concatFields + genre.genreLabelFR;
      } else {
        concatFields = concatFields + ', ' + genre.genreLabelFR;
      }
      console.log(genre.genreLabelFR);
    });
    return concatFields;
  }

  joinAllDutchGenreLabels(genres: Genre[]): string {
    let concatFields = '';
    genres.forEach((genre) => {
      if (concatFields === '') {
        concatFields = concatFields + genre.genreLabelNL;
      } else {
        concatFields = concatFields + ', ' + genre.genreLabelNL;
      }
      console.log(genre.genreLabelNL);
    });
    return concatFields;
  }
}
