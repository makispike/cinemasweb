import {Movie} from './movie';
import {Venue} from './venue';
import {Version} from './version';

export interface Screening {
  screeningId: number;
  screeningDate: string;
  screeningTime: string;
  availableSeats: number;
  venue: Venue;
  movie: Movie;
  version: Version;
}
