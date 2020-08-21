import {Reservation} from './reservations';

export interface User {
  userId: number;
  userEmail: string;
  userLastName: string;
  userFirstName: string;
  userAddress: string;
  userContactEmail: string;
  reservations: Reservation[];
}
