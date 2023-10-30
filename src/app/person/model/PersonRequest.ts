import { Address } from './Address';

export interface PersonRequest {
  name: string;
  email: string;
  date_of_birth: Date;
  gender: string;
  address: Address;
}
