import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { JwtHelper } from 'angular2-jwt';

@Injectable()
export class AuthenticationService {

    edgeServiceUrl = `http://localhost:8080/api/userservice/auth/oauth/token`;

    constructor(private _router: Router, private _http: HttpClient) {}

    obtainAccessToken(loginData) {
        console.log('obtaining access token');
        const headers = new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa('front-end:front-end')
        });

        console.log(loginData);

        const params = new HttpParams()
            .set('grant_type', 'password')
            .set('scope', 'webclient')
            .set('username', loginData.username)
            .set('password', loginData.password);

        const requestOptions = {
            headers,
            withCredentials: true,
        };

        console.log(params.toString());

        this._http.post(
            this.edgeServiceUrl,
            params.toString(),
            requestOptions,
        ).subscribe(
            data => {
                const token = (data as any).access_token;
                localStorage.setItem('accessToken', token);
                localStorage.setItem('userId', this.getUserId(token));
            },
            err => {
                alert('Invalid credientals');
                console.warn(`Failed to communicated with the user service. Err: ${JSON.stringify(err)}`);
            });
    }

    checkCredentials() {
        const token = localStorage.getItem('accessToken');
        if (token != null) {
            this._router.navigate(['/dashboard']);
        }
    }

    getUserId(access_token) {
        const helper = new JwtHelper();
        const decodedToken = helper.decodeToken(access_token);
        return (decodedToken as any).uuid;
    }

    logout() {
        localStorage.clear();
        this._router.navigate(['/login']);
    }

}
