import { Version } from './version';
import {Genre} from './genre';
import {Screening} from './screening';

export interface Movie {
  movieId: number;
  movieNameFR: string;
  movieNameNL: string;
  movieNameEN: string;
  movieDescriptionFR: string;
  movieDescriptionNL: string;
  movieDescriptionEN: string;
  moviePictureUrl: string;
  versions: Version[];
  genres: Genre[];
  screenings: Screening[];
}
