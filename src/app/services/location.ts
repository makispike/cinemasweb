import {Venue} from './venue';
import {Pricecategory} from './pricecategory';

export interface Location {
  locationId: number;
  locationName: string;
  locationAddress: string;
  locationDescriptionFR: string;
  locationDescriptionNL: string;
  locationDescriptionEN: string;
  locationPhotoUrl: string;
  venues: Venue[];
  priceCategories: Pricecategory[];
}
