import {Component, OnInit} from '@angular/core';
import {ScreeningService} from '../services/screening.service';
import {Screening} from '../services/models/screening';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  screeningsList: Screening[];
  filteredScreenings: Screening[];
  filtered = false;
  showDate = false;
  showGenre = false;
  showTitle = true;
  showLocation = false;
  desiredTitle: string;
  desiredDate: string;
  desiredGenre: string;
  desiredLocation: string;
  selectedLevel;
  data: Array<object> = [
    {id: 0, name: 'By title'},
    {id: 1, name: 'By genre'},
    {id: 2, name: 'By location'},
    {id: 3, name: 'By date'}
  ];

  constructor(private screeningsService: ScreeningService) {
  }

  selected() {
    if (this.selectedLevel.id === 0) {
      this.showTitle = true;
      this.showGenre = false;
      this.showLocation = false;
      this.showDate = false;
    } else if (this.selectedLevel.id === 1) {
      this.showTitle = false;
      this.showGenre = true;
      this.showLocation = false;
      this.showDate = false;
    } else if (this.selectedLevel.id === 2) {
      this.showTitle = false;
      this.showGenre = false;
      this.showLocation = true;
      this.showDate = false;
    } else if (this.selectedLevel.id === 3) {
      this.showTitle = false;
      this.showGenre = false;
      this.showLocation = false;
      this.showDate = true;
    }
  }

  ngOnInit(): void {
    this.fetchAllScreenings();
  }

  fetchAllScreenings(): void {
    this.screeningsService.getAllScreenings().subscribe(screenings => this.screeningsList = screenings);
  }

  filterBySelection(): void {
    if (this.screeningsList !== undefined && this.screeningsList.length !== 0) { // avoid iterating on an empty or undefined list
      this.filteredScreenings = [];
      if (this.showTitle) {
        for (const screening of this.screeningsList) {
          console.log(screening.movie.movieNameEN);
          if (screening.movie.movieNameEN.includes(this.desiredTitle) ||
            screening.movie.movieNameNL.includes(this.desiredTitle) ||
            screening.movie.movieNameFR.includes(this.desiredTitle)) {
            this.filteredScreenings.push(screening);
          }
        }
      } else if (this.showGenre) {
        for (const screening of this.screeningsList) {
          for (const genre of screening.movie.genres) {
            if (genre.genreLabelEN.includes(this.desiredGenre) ||
              genre.genreLabelFR.includes(this.desiredGenre) ||
              genre.genreLabelNL.includes(this.desiredGenre)) {
              this.filteredScreenings.push(screening);
            }
          }
        }
      } else if (this.showLocation) {
        for (const screening of this.screeningsList) {
          if (screening.venue.location.locationName.includes(this.desiredLocation)) {
            this.filteredScreenings.push(screening);
          }
        }
      } else if (this.showDate) {
        for (const screening of this.screeningsList) {
          console.log(screening.screeningDate);
          console.log(this.desiredDate);
          if (screening.screeningDate.includes(this.desiredDate)) {
            this.filteredScreenings.push(screening);
          }
        }
      }
    }
  }

}
