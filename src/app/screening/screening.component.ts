import {Component, Input, OnInit} from '@angular/core';
import {Screening} from '../services/models/screening';
import {AppComponent} from '../app.component';
import {MovieService} from '../services/movie.service';

@Component({
  selector: 'app-screening',
  templateUrl: './screening.component.html',
  styleUrls: ['./screening.component.css']
})
export class ScreeningComponent implements OnInit {
  @Input() filtered;
  @Input() selectedDate: string;
  @Input() screening: Screening;
  id: number;

  constructor(public appComponent: AppComponent,
              public moviesService: MovieService) { }

  ngOnInit(): void {
    console.log(this.selectedDate);
    console.log(this.screening.screeningDate);
  }

  getAllEnglishGenres() {
    if (this.screening.movie.genres == null){
      return null;
    }
    return this.moviesService.joinAllEnglishGenreLabels(this.screening.movie.genres);
  }

  getAllFrenchGenres() {
    if (this.screening.movie.genres == null){
      return null;
    }
    return this.moviesService.joinAllFrenchGenreLabels(this.screening.movie.genres);
  }

  getAllDutchGenres() {
    if (this.screening.movie.genres === null){
      return null;
    }
    return this.moviesService.joinAllDutchGenreLabels(this.screening.movie.genres);
  }
}
