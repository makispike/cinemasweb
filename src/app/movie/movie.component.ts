import {Component, Input, OnInit} from '@angular/core';
import {MovieserviceService} from '../services/movieservice.service';
import {Movie} from '../services/movie';
import {AppComponent} from '../app.component';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
  @Input() movie: Movie;

  constructor(public moviesService: MovieserviceService, public appComponent: AppComponent) { }

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
