import {Location} from './location';

export interface Pricecategory {
  priceCategoryId: number;
  priceCategoryPrice: number;
  priceCategoryNameFR: string;
  priceCategoryNameNL: string;
  priceCategoryNameEN: string;
  location: Location;
}
