import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class AvailableRidesService {

  token = '';

  constructor(
    private http: HttpClient
  ) {
   }

   getAllAvailableTrips(){
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Bearer ' + this.token
    });
    const body ='';
    const options = {
      headers,
      withCredentials: true
    };
    let token = {};

    return this.http.post('http://localhost/api/trip/cmd/query/trips/available', body, options );
   }

}
