import { Address } from "./Address";

export interface PersonResponse {
  id: string;
  name: string;
  email: string;
  date_of_birth: Date;
  age: number;
  gender: string;
  created_at: Date;
  updated_at: Date;
  address: Address;
}
