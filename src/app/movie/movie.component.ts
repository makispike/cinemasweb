import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  @Input() title: string;
  @Input() description: string;
  @Input() genres: string;
  @Input() versions: string;
  @Input() locations: string;
  @Input() photoUrl: string;

  constructor() { }

  ngOnInit(): void {
  }

}
