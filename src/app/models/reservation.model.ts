import { Rando } from './rando.model';
import { UserProfile } from './user.model';

export interface Reservation {
    id: number;
    reservationDate: Date; // Ensure this is of type Date
    status: string;
    rando: Rando;
    user: UserProfile;
  }
  