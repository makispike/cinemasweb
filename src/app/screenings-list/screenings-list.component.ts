import {Component, OnInit} from '@angular/core';
import {ScreeningService} from '../services/screening.service';
import {Screening} from '../services/models/screening';

@Component({
  selector: 'app-screenings-list',
  templateUrl: './screenings-list.component.html',
  styleUrls: ['./screenings-list.component.css']
})
export class ScreeningsListComponent implements OnInit {
  screeningsList: Screening[];
  selectedDate: string;

  constructor(public screeningsService: ScreeningService) { }

  ngOnInit(): void {
    this.fetchAllScreenings();
  }

  fetchAllScreenings(): void {
    this.screeningsService.getAllScreenings().subscribe(screenings => this.screeningsList = screenings);
  }

  onChangeDate(): void {
    console.log(this.selectedDate);
    // this.screeningsService.getAllScreeningsByDate(date).subscribe(screenings => this.screeningsList = screenings);
  }
}
