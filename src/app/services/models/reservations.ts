import {User} from './user';
import {Ticket} from './ticket';

export interface Reservation {
  reservationId: number;
  reservationDateTime: string;
  totalPrice: number;
  user: User;
  tickets: Ticket[];
}
