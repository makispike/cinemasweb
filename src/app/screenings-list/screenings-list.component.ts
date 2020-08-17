import {Component, OnInit} from '@angular/core';
import {ScreeningserviceService} from '../services/screeningservice.service';
import {Screening} from '../services/screening';

@Component({
  selector: 'app-screenings-list',
  templateUrl: './screenings-list.component.html',
  styleUrls: ['./screenings-list.component.css']
})
export class ScreeningsListComponent implements OnInit {
  screeningsList: Screening[];
  movies = [
    {
      title: 'Pulp Fiction',
      location: 'lol',
      venue: 'Kinepolis Antwerpen',
      genres: ['action', 'romance'] ,
      versions: ['VOST', 'VF'],
      availableSeats: '5',
      time: '12:00',
      urlPhoto: 'https://i.imgur.com/3nyHwyb.png'
    },
    {
      title: 'Pulp Fiction',
      location: 'lol',
      venue: 'Kinepolis Antwerpen',
      genres: ['action', 'romance'] ,
      versions: ['VOST', 'VF'],
      availableSeats: '5',
      time: '12:00',
      urlPhoto: 'https://i.imgur.com/3nyHwyb.png'
    },
    {
      title: 'Pulp Fiction',
      location: 'lol',
      venue: 'Kinepolis Antwerpen',
      genres: ['action', 'romance'] ,
      versions: ['VOST', 'VF'],
      availableSeats: '5',
      time: '12:00',
      urlPhoto: 'https://i.imgur.com/3nyHwyb.png'
    },
  ];
  selectedDate: string;

  constructor(public screeningsService: ScreeningserviceService) { }

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
