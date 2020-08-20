import {Component, OnInit} from '@angular/core';
import {MovieService} from '../services/movie.service';
import {Movie} from '../services/models/movie';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css']
})
export class MoviesListComponent implements OnInit {
  moviesList: Movie[];
  constructor(public moviesService: MovieService) { }

  ngOnInit(): void {
    this.fetchAllMovies();
  }

  fetchAllMovies(): void {
    this.moviesService.getAllMovies().subscribe(movies => this.moviesList = movies);
  }

}
