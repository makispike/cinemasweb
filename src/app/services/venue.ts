import {Location} from './location';
import {Screening} from './screening';

export interface Venue {
  venueId: number;
  venueNumber: number;
  venueSeatsAmount: number;
  screenings: Screening[];
  location: Location;
}
