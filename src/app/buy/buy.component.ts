import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import 'rxjs/add/operator/filter';
import {ScreeningService} from '../services/screening.service';
import {Screening} from '../services/models/screening';
import {AppComponent} from '../app.component';
import {Pricecategory} from '../services/models/pricecategory';
import {BuyService} from '../services/buy.service';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.css']
})
export class BuyComponent implements OnInit {
  screeningId: number;
  screening: Screening;
  screeningLocation: string;
  screeningVenue: number;
  movieTitleEN: string;
  movieTitleFR: string;
  movieTitleNL: string;
  screeningVersion: string;
  screeningDate: number;

  priceCategories: Pricecategory[];
  constructor(private router: Router, public route: ActivatedRoute, private screeningsService: ScreeningService,
              private appComponent: AppComponent, private buyService: BuyService) { }

  ngOnInit(): void {
    this.route.queryParams
      .filter(params => params.screeningId)
      .subscribe(params => {
          this.screeningId = params.screeningId;
        }
      );
    this.fetchScreening();
  }

  onBack() {
    this.router.navigate(['/screenings']);
  }

  fetchScreening() {
    this.screeningsService.getSingleScreening(this.screeningId).subscribe(screening => {
      this.screening = screening;
      this.movieTitleEN = screening.movie.movieNameEN;
      this.movieTitleFR = screening.movie.movieNameFR;
      this.movieTitleNL = screening.movie.movieNameNL;
      this.screeningVersion = screening.version.versionLabel;
      this.screeningLocation = screening.venue.location.locationName;
      this.screeningVenue = screening.venue.venueNumber;
      this.screeningDate = Date.parse(screening.screeningDate + ' ' + screening.screeningTime);
      this.priceCategories = screening.venue.location.priceCategories;
      console.log(this.priceCategories);
    });
  }

  getLanguageInUse(): string {
    return this.appComponent.languageInUse;
  }
}
