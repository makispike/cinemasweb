import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css']
})
export class LocationsComponent implements OnInit {
  selectedLevel;

  location = [
    {
      venue: 'Kinepolis Antwerpen',
      numberOfVenues: '10',
      details: 'Hello everyone',
      urlPhoto: 'https://i.imgur.com/ATwNVRG.png'
    }];

  location2 = [
    {
      title: 'Pulp Fiction',
      location: 'lol',
      venue: 'Kinepolis Gent',
      genres: ['action', 'romance'],
      versions: ['VOST', 'VF'],
      availableSeats: '5',
      time: '12:00',
      urlPhoto: 'https://i.imgur.com/3nyHwyb.png'
    }];

  locations = [
    {
      id: '1',
      location: 'Kinepolis Antwerpen'
    },
    {
      id: '2',
      location: 'Kinepolis Gent'
    }];

  constructor() {
  }

  ngOnInit(): void {
  }

  selected() {
    console.log(this.selectedLevel);
  }

}
