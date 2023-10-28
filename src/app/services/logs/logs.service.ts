import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Log } from 'src/app/interfaces/Log';

import { environment } from 'src/environments/environment.development';
import { StatusDataCollectionLinksResponse } from 'src/app/interfaces/StatusDataCollectionLinksResponse';

@Injectable({
  providedIn: 'root'
})
export class LogsService {

  private baseApiUrl = environment.baseURL;
  private apiUrl = `${this.baseApiUrl}/logs`;

  constructor(private http : HttpClient) { }

  getLogs() : Observable<StatusDataCollectionLinksResponse<Log[]>> {
    return this.http.get<StatusDataCollectionLinksResponse<Log[]>>(this.apiUrl);
  }

}
