
import { CollectionLink } from "./CollectionLink";
import { StatusResponse } from "./StatusResponse";

export interface StatusDataCollectionLinksResponse<T> {

  status: StatusResponse;

  collection_link: CollectionLink[];
  
  data: T;

}