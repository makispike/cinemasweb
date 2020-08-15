import {Movie} from './movie';
import {Venue} from './venue';

export interface Screening {
  screeningId: number;
  screeningDate: string;
  screeningTime: string;
  availableSeats: number;
  venue: Venue;
  movies: Movie[];
}
