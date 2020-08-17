import {Component, OnInit} from '@angular/core';
import {LocationserviceService} from '../services/locationservice.service';
import {Location} from '../services/location';
import {DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';
import {AppComponent} from '../app.component';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css']
})
export class LocationsComponent implements OnInit {
  locationsList: Location[];
  selectedLevel;

  mapsURL: SafeResourceUrl;
  photoURL: string;
  detailsEN: string;
  detailsFR: string;
  detailsNL: string;
  locationName: string;
  numberOfVenues: number;

  constructor(private locationsService: LocationserviceService, private sanitizer: DomSanitizer, public appComponent: AppComponent) {
  }

  ngOnInit(): void {
    this.fetchAllLocations();
  }

  selected() {
    this.mapsURL = this.sanitizer.bypassSecurityTrustResourceUrl(this.createLocationMapURL(this.locationsList[this.selectedLevel]));
    this.photoURL = this.locationsList[this.selectedLevel].locationPhotoUrl;
    this.detailsEN = this.locationsList[this.selectedLevel].locationDescriptionEN;
    this.detailsFR = this.locationsList[this.selectedLevel].locationDescriptionFR;
    this.detailsNL = this.locationsList[this.selectedLevel].locationDescriptionNL;
    this.locationName = this.locationsList[this.selectedLevel].locationName;
    this.numberOfVenues = this.locationsList[this.selectedLevel].venues.length;
    console.log(this.selectedLevel);
  }

  fetchAllLocations(): void {
    this.locationsService.getAllLocations().subscribe(locations => this.locationsList = locations);
  }

  createLocationMapURL(singleLocation: Location): string {
    const startUrl = 'https://www.google.com/maps/embed/v1/place?key=AIzaSyDU3bB3xWAy_3jymPe2NV0pEKBZslOSj1w&q=';
    return startUrl.concat(singleLocation.locationName.replace(' ', '+'));
  }

}
