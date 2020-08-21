import {Pricecategory} from './pricecategory';
import {Screening} from './screening';
import {Reservation} from './reservations';

export interface Ticket {
  ticketId: number;
  reservation: Reservation;
  screening: Screening;
  priceCategory: Pricecategory;
}
