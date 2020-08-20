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
  showDate = false;
  showGenre = false;
  showTitle = true;
  showLocation = false;
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

}
