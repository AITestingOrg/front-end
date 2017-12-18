import { Injectable } from '@angular/core'; 
import { Http } from '@angular/http'; 
 
@Injectable() 
export class APIGatewayService { 
 
  private http:Http; 
  private apiUrl = "http://10.55.13.61:8082/api/"; 
  private availableDriversList:any;
 
  constructor(http:Http) { 
    this.http = http; 
   } 
 
  // Trip Management  
 
  getDirections(originAddress:string, destinationAddress:string, directionsDisplay:any) { 
    let postUrl = this.apiUrl.concat("trips/directions"); 
    this.http.post(postUrl, { 
      "origin": originAddress, 
      "destination": destinationAddress 
    }).subscribe(result => { 
      let body = result.json(); 
      //directionsDisplay.set(body["routes"]); 
      console.log("Result of getDirections: ");
      console.log(body); 
      return result; 
    }) 
  } 
   
  getTrip(passenger:string, driver:string, car:string, originAddress:string, destinationAddress:string) { 
    let postUrl = this.apiUrl.concat(passenger, "/", driver, "/", car, "/", originAddress, "/", destinationAddress); 
    this.http.post(postUrl, {}).subscribe(result => { 
      console.log("Result of getTrip: ");
      console.log(result); 
    }) 
  } 

  // Driver Management

  getAvailableDrivers(origin:string) {
    let getUrl = this.apiUrl.concat("drivers");    
    let promise = new Promise((resolve, reject) => {
      this.http.get(getUrl).toPromise().then(
        result => {
          this.availableDriversList = result.json();
          console.log(this.availableDriversList);
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