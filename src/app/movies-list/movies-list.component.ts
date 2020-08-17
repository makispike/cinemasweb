import {Component, OnInit} from '@angular/core';
import {MovieserviceService} from '../services/movieservice.service';
import {Movie} from '../services/movie';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css']
})
export class MoviesListComponent implements OnInit {
  moviesList: Movie[];
  constructor(public moviesService: MovieserviceService) { }

  ngOnInit(): void {
    this.fetchAllMovies();
  }

  fetchAllMovies(): void {
    this.moviesService.getAllMovies().subscribe(movies => this.moviesList = movies);
  }

}
