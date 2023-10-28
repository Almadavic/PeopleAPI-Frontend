import { StatusResponse } from "./StatusResponse";

export interface StatusDataResponse<T> {

  status: StatusResponse;
  
  data: T;
 
 }