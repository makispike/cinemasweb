import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Screening} from '../services/screening';
import {Version} from '../services/version';
import {Genre} from '../services/genre';
import {AppComponent} from '../app.component';
import {MovieserviceService} from '../services/movieservice.service';

@Component({
  selector: 'app-screening',
  templateUrl: './screening.component.html',
  styleUrls: ['./screening.component.css']
})
export class ScreeningComponent implements OnInit {
  @Input() title: string;
  @Input() description: string;
  @Input() venue: number;
  @Input() genres: Genre[];
  @Input() versions: Version[];
  @Input() location: string;
  @Input() availableSeats: string;
  @Input() time: string;
  @Input() urlPhoto: string;

  @Input()filtered;
  @Input() selectedDate: string;
  @Input() screening: Screening;

  constructor(private router: Router, public appComponent: AppComponent, public moviesService: MovieserviceService) { }

  ngOnInit(): void {
    console.log(this.selectedDate);
    console.log(this.screening.screeningDate);
  }

  onBuy() {
    this.router.navigate(['/buy']);
  }

  getAllVersions() {
    return this.moviesService.joinAllVersionLabels(this.screening.movie.versions);
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
