import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-screenings-list',
  templateUrl: './screenings-list.component.html',
  styleUrls: ['./screenings-list.component.css']
})
export class ScreeningsListComponent implements OnInit {
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

  constructor() { }

  ngOnInit(): void {
  }

}
