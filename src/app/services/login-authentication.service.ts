import { Observable } from 'rxjs/Rx';
import { Injectable, Inject } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import 'rxjs/Rx';
import { User } from '../common/models/user';


@Injectable()
export class LoginAuthenticationService {


    // instance variables
    private currentUser:  User;

  constructor(
    private http: HttpClient
  ) {
   }

    /**
     * Returns current authenticated user object instance
     */
    public getCurrentUser(): User {
      return this.currentUser;
    }


   /**
     * Authenticate the user
     * Sets currentUser class variable to the authenticated user on success
     * Sets the jwt token in sessionStorage as currentUserJWT
     * 
     * Uses LoginResponse interface to map the response from the backend
     * 
     * Returns success: Returns the User object upon success
     */
    public login(username, password) {
      const headers = new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa('front-end:front-end')
      });
      const body ='grant_type=password&scope=webclient&username='+username+'&password='+password;
      const options = {
        headers,
        withCredentials: true
      };
      let token = {};

      return this.http.post('http://192.168.99.100:8091/auth/oauth/token', body, options ).map(res => {
        // login successful if there's a jwt token in the response
        if (res) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(res));
            console.log(JSON.stringify(res));
        }

        return res;
    });

    }

    /**
     * Logs the current user out
     */
    public logout(): void {
      this.currentUser = null;
      sessionStorage.removeItem('currentUserJWT');
    }



}
