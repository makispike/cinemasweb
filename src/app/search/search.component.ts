import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  showDate: boolean;
  movies = [
    {
      title: 'Pulp Fiction',
      location: 'lol',
      venue: 'Kinepolis Antwerpen',
      genres: ['action', 'romance'],
      versions: ['VOST', 'VF'],
      availableSeats: '5',
      time: '12:00',
      urlPhoto: 'https://i.imgur.com/3nyHwyb.png'
    },
    {
      title: 'Pulp Fiction',
      location: 'lol',
      venue: 'Kinepolis Antwerpen',
      genres: ['action', 'romance'],
      versions: ['VOST', 'VF'],
      availableSeats: '5',
      time: '12:00',
      urlPhoto: 'https://i.imgur.com/3nyHwyb.png'
    },
    {
      title: 'Pulp Fiction',
      location: 'lol',
      venue: 'Kinepolis Antwerpen',
      genres: ['action', 'romance'],
      versions: ['VOST', 'VF'],
      availableSeats: '5',
      time: '12:00',
      urlPhoto: 'https://i.imgur.com/3nyHwyb.png'
    },
  ];

  constructor() {
  }

  selectedLevel;
  data: Array<object> = [
    {id: 0, name: 'By title'},
    {id: 1, name: 'By genre'},
    {id: 2, name: 'By location'},
    {id: 3, name: 'By date'}
  ];

  selected() {
    this.showDate = this.selectedLevel.id === 3;
  }

  ngOnInit(): void {
  }

}
