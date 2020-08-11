import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css']
})
export class MoviesListComponent implements OnInit {
  movies = [
    {
      title: 'Pulp Fiction',
      description: 'lol',
      genres: ['action', 'romance'] ,
      versions: ['VOST', 'VF']
    },
    {
      title: 'Titanic',
      description: 'lolilol',
      genres: ['action', 'romance'] ,
      versions: ['VOST', 'NL']
    },
    {
      title: 'Reservoir Dogs',
      description: 'lol',
      genres: ['action', 'romance'] ,
      versions: ['VOST', 'VF']
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
