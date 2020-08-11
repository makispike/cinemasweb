import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-screening',
  templateUrl: './screening.component.html',
  styleUrls: ['./screening.component.css']
})
export class ScreeningComponent implements OnInit {
  @Input() title: string;
  @Input() description: string;
  @Input() venue: string;
  @Input() genres: string;
  @Input() versions: string;
  @Input() location: string;
  @Input() availableSeats: string;
  @Input() time: string;
  @Input() urlPhoto: string;

  constructor() { }

  ngOnInit(): void {
  }

}
