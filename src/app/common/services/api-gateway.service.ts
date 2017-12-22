import { Injectable } from '@angular/core'; 
import { Http } from '@angular/http'; 
import { Subject } from 'rxjs/Subject';
 
@Injectable() 
export class APIGatewayService { 
 
  private http:Http; 
  private apiUrl = "http://10.55.13.61:8082/api/";
  private driverApiUrl = "http://10.55.13.61:8082/api/drivers/";
  private tripApiUrl = "http://10.55.13.61:8081/api/trips/"; 
  private availableDriversList:any;
  private latlng:any;
  private trip:any;
  private results:any;
 
  constructor(http:Http) { 
    this.http = http; 
    this.results = [];
   } 
 
  // Trip Management  
  getLatLng(address:string) {
    let postUrl = this.tripApiUrl.concat("getlatlng");
    let promise = new Promise((resolve, reject) => {
      this.http.post(postUrl, {
        "address": address
      }).toPromise().then(
        result => {
          this.latlng = result.json();
          resolve(result.json());
        },
        message => {
          reject(message);
        }
      );
    });
    return promise;
  }

  getTrip(driverName:string) {
    let postUrl = this.driverApiUrl.concat("");    
    let promise = new Promise((resolve, reject) => {
      this.http.post(postUrl, {
        "driverName":driverName
      }).toPromise().then(
        result => {
          this.trip = result.json();
          resolve(result.json());
        },
        message => {
          reject(message);
        }
      );
    });
    return promise;
  }

  // Driver Management
  addDriver() {
    let postUrl = this.driverApiUrl.concat();
    this.http.post(postUrl, {
      "fname": "Cage",
      "lname": "The",
      "id": "Elephant"
    })
  }

  getAvailableDrivers() {
    let getUrl = this.driverApiUrl.concat("available-drivers");    
    let promise = new Promise((resolve, reject) => {
      this.http.get(getUrl).toPromise().then(
        result => {
          this.availableDriversList = result.json();
          resolve(result.json());
        },
        message => {
          reject(message);
        }
      );
    });
    return promise;
  }

} 