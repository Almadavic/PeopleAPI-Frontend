import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment.development';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { catchError, Observable, throwError } from 'rxjs';

import { PersonResponse } from 'src/app/person/model/PersonResponse';

import { StatusDataCollectionLinksResponse } from 'src/app/interfaces/StatusDataCollectionLinksResponse';
import { StatusDataResponse } from 'src/app/interfaces/StatusDataResponse';
import { StatusResponse } from 'src/app/interfaces/StatusResponse';
import { PersonRequest } from 'src/app/person/model/PersonRequest';

@Injectable({
  providedIn: 'root',
})
export class PersonService {
  private baseApiUrl = environment.baseURL;
  private apiUrl = `${this.baseApiUrl}/people`;

  constructor(private http: HttpClient) {}

  getPeople(): Observable<StatusDataCollectionLinksResponse<PersonResponse[]>> {
    return this.http.get<StatusDataCollectionLinksResponse<PersonResponse[]>>(
      this.apiUrl
    );
  }

  getPerson(id: string): Observable<StatusDataResponse<PersonResponse>> {
    const apiUrl = `${this.apiUrl}/${id}`;
    return this.http.get<StatusDataResponse<PersonResponse>>(apiUrl);
  }

  savePerson(
    person: PersonRequest
  ): Observable<StatusDataResponse<PersonResponse>> {
    return this.http.post<StatusDataResponse<PersonResponse>>(
      this.apiUrl,
      person
    );
  }

  updatePerson(
    person: PersonRequest,
    id: string
  ): Observable<StatusDataResponse<PersonResponse>> {
    const apiUrl = `${this.apiUrl}/${id}`;
    return this.http.put<StatusDataResponse<PersonResponse>>(apiUrl, person);
  }

  removePerson(id: string): Observable<StatusResponse> {
    const apiUrl = `${this.apiUrl}/${id}`;
    return this.http.delete<StatusResponse>(apiUrl);
  }
}
