import {Component, Input, OnInit} from '@angular/core';
import {MovieService} from '../services/movie.service';
import {Movie} from '../services/models/movie';
import {AppComponent} from '../app.component';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
  @Input() movie: Movie;

  constructor(public moviesService: MovieService, public appComponent: AppComponent) { }

  ngOnInit(): void {
  }

  getAllVersions() {
    return this.moviesService.joinAllVersionLabels(this.movie.versions);
  }

  getAllEnglishGenres() {
    return this.moviesService.joinAllEnglishGenreLabels(this.movie.genres);
  }

  getAllFrenchGenres() {
    return this.moviesService.joinAllFrenchGenreLabels(this.movie.genres);
  }

  getAllDutchGenres() {
    return this.moviesService.joinAllDutchGenreLabels(this.movie.genres);
  }
}
