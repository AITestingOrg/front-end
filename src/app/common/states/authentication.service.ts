import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { JwtHelper } from 'angular2-jwt';

@Injectable()
export class AuthenticationService {

    edgeServiceUrl = `http://edgeservice:8080/api/userservice/auth/oauth/token`;

    constructor(private router: Router, private http: HttpClient) {}

    login(username, password) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa('front-end:front-end')
        });

        const params = new HttpParams()
            .set('grant_type', 'password')
            .set('scope', 'webclient')
            .set('username', username)
            .set('password', password);

        const requestOptions = {
            headers,
            withCredentials: true,
        };

        this.http.post(
            this.edgeServiceUrl,
            params.toString(),
            requestOptions
        ).subscribe(
            data => this.storeUserData(data),
            err => alert('Invalid credentials')
        );
    }

    checkCredentials() {
        const token = localStorage.getItem('accessToken');
        if (token != null) {
            this.router.navigate(['/dashboard']);
        }
    }

    logout() {
        localStorage.clear();
        this.router.navigate(['/login']);
    }

    private storeUserData(data) {
        const token = (data as any).access_token;
        localStorage.setItem('accessToken', token);
        localStorage.setItem('userId', this.decodeUserId(token));
    }

    private decodeUserId(accessToken) {
        const helper = new JwtHelper();
        const decodedToken = helper.decodeToken(accessToken);
        return (decodedToken as any).userId;
    }

}
