import {Component, OnInit} from '@angular/core';
import {LocationService} from '../services/location.service';
import {Location} from '../services/models/location';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
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

  constructor(private locationsService: LocationService,
              private sanitizer: DomSanitizer,
              public appComponent: AppComponent) {
  }

  ngOnInit(): void {
    this.fetchAllLocations();
  }

  selected() {
    // There is a security on this type of resource, stopping it from showing. We need to deactivate that security first.
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

  // This is based on the (existing) Kinepolis locations, inserted into an URL which will then be used to call the Google Maps API.
  createLocationMapURL(singleLocation: Location): string {
    const startUrl = 'https://www.google.com/maps/embed/v1/place?key=AIzaSyDU3bB3xWAy_3jymPe2NV0pEKBZslOSj1w&q=';
    return startUrl.concat(singleLocation.locationName.replace(' ', '+'));
  }

}
