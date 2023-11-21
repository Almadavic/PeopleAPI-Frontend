
import { CollectionLink } from "./CollectionLink";
import { StatusResponse } from "./StatusResponse";

export interface StatusDataCollectionLinksResponse<T> {

  status: StatusResponse;

  items_amount: number;

  collection_link: CollectionLink[];

  data: T;

}
