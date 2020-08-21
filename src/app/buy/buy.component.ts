import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import 'rxjs/add/operator/filter';
import {ScreeningService} from '../services/screening.service';
import {Screening} from '../services/models/screening';
import {AppComponent} from '../app.component';
import {Pricecategory} from '../services/models/pricecategory';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {newArray, stringify} from '@angular/compiler/src/util';
import {Ticket} from '../services/models/ticket';
import {Reservation} from '../services/models/reservations';
import {User} from '../services/models/user';
import {Venue} from '../services/models/venue';
import {Movie} from '../services/models/movie';
import {Version} from '../services/models/version';
import {BuyService} from '../services/buy.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.css']
})
export class BuyComponent implements OnInit, OnDestroy {
  subscription1: Subscription;
  subscription2: Subscription;
  screeningId: number;
  screening: Screening;
  screeningLocation: string;
  screeningVenue: number;
  movieTitleEN: string;
  movieTitleFR: string;
  movieTitleNL: string;
  screeningVersion: string;
  screeningDate: number;
  availableSeats: number;
  success: boolean;
  totalPrice = 0;
  confirmed = false;
  ticketsToCreate: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  ticketsToSend: any[];
  newScreening: Screening;
  newReservation: Reservation;
  newUser: User;
  ticket: Ticket;

  priceCategories: Pricecategory[];
  constructor(private formBuilder: FormBuilder, private router: Router, public route: ActivatedRoute,
              private screeningsService: ScreeningService, private appComponent: AppComponent, private buyService: BuyService) { }

  ngOnInit(): void {
    this.route.queryParams
      .filter(params => params.screeningId)
      .subscribe(params => {
          this.screeningId = params.screeningId;
        }
      );
    this.fetchScreening();
  }

  onAmountChanged() {
    let i = 0;
    for (const priceCategory of this.priceCategories) {
      console.log(this.ticketsToCreate[i].valueOf() + ' tickets to create for ' + priceCategory.priceCategoryNameEN +
        priceCategory.priceCategoryPrice);
      this.totalPrice += this.ticketsToCreate[i].valueOf() * priceCategory.priceCategoryPrice;
      i++;
    }
    this.confirmed = false;
  }

  onSubmit() {
    let i = 0;
    this.ticketsToSend = [];
    for (const priceCategory of this.priceCategories) {
      for (let j = 0; j < this.ticketsToCreate[i]; j++){
        this.newUser = {
          userId: Number(localStorage.getItem('userId')),
          userLastName: null,
          userAddress: null,
          userContactEmail: null,
          userFirstName: null,
          userEmail: null,
          reservations: null
        };

        this.newScreening = {
          screeningId: Number(this.screeningId),
          screeningDate: null,
          screeningTime: null,
          availableSeats: null,
          venue: null,
          movie: null,
          version: null,
        };

        this.newReservation = {
          reservationId: null,
          reservationDateTime: null,
          totalPrice: this.totalPrice,
          user: this.newUser,
          tickets: null
        };

        this.ticket = {
          ticketId: null,
          reservation: this.newReservation,
          screening: this.newScreening,
          priceCategory
        };
        console.log(this.ticket);
        this.ticketsToSend.push(this.ticket);
      }
      i++;
    }
    this.subscription1 = this.buyService.registerTickets(this.ticketsToSend).subscribe(() => this.success = true);
  }

  onBack() {
    this.router.navigate(['/screenings']);
  }

  fetchScreening() {
    this.subscription2 = this.screeningsService.getSingleScreening(this.screeningId).subscribe(screening => {
      this.screening = screening;
      this.movieTitleEN = screening.movie.movieNameEN;
      this.movieTitleFR = screening.movie.movieNameFR;
      this.movieTitleNL = screening.movie.movieNameNL;
      this.availableSeats = screening.availableSeats;
      this.screeningVersion = screening.version.versionLabel;
      this.screeningLocation = screening.venue.location.locationName;
      this.screeningVenue = screening.venue.venueNumber;
      this.screeningDate = Date.parse(screening.screeningDate + ' ' + screening.screeningTime);
      this.priceCategories = screening.venue.location.priceCategories;
      localStorage.setItem('priceCategories', stringify(this.priceCategories));
      console.log(this.priceCategories);
    });
  }

  getLanguageInUse(): string {
    return this.appComponent.languageInUse;
  }
  ngOnDestroy() {
    this.subscription1.unsubscribe();
    this.subscription2.unsubscribe();
  }
}
