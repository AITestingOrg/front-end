import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { TestBed, getTestBed, fakeAsync, tick } from '@angular/core/testing';
import { AuthenticationService } from './authentication.service';
import { Component } from '@angular/core';

describe('AuthenticationService', () => {
    let authenticationService: AuthenticationService;
    let httpMock: HttpTestingController;
    let router: Router;
    const url = 'http://localhost:8080/api/userservice/auth/oauth/token';

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                HttpClientTestingModule
            ],
            providers: [AuthenticationService]
        });

        authenticationService = TestBed.get(AuthenticationService);
        httpMock = TestBed.get(HttpTestingController);
        router = TestBed.get(Router);

        let store = {};
        const mockLocalStorage = {
            getItem: (key: string): string => {
                return key in store ? store[key] : null;
            },
            setItem: (key: string, value: string) => {
                store[key] = `${value}`;
            },
            removeItem: (key: string) => {
                delete store[key];
            },
            clear: () => {
                store = {};
            }
        };
        spyOn(localStorage, 'getItem')
            .and.callFake(mockLocalStorage.getItem);
        spyOn(localStorage, 'setItem')
            .and.callFake(mockLocalStorage.setItem);
        spyOn(localStorage, 'removeItem')
            .and.callFake(mockLocalStorage.removeItem);
        spyOn(localStorage, 'clear')
            .and.callFake(mockLocalStorage.clear);

        spyOn(window, 'alert');
    });

    it('should be created', () => {
        expect(authenticationService).toBeTruthy();
    });

    it('should authenticate the user', () => {
        const username = 'HappyUsername';
        const password = 'HappyPassword';
        const happyResponse = {
            access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvcmdhbml6YXRpb25JZCI6IkhhcH'
                + 'B5T3JnYW5pemF0aW9uSWQiLCJ1c2VyX25hbWUiOiJwYXNzZW5nZXIiLCJzY29wZSI6WyJ3ZWJjbG'
                + 'llbnQiXSwiZXhwIjoxNTMzMDkyMTg0LCJ1c2VySWQiOiJIYXBweVVzZXJJZCIsImF1dGhvcml0aW'
                + 'VzIjpbIlJPTEVfUEFTU0VOR0VSIiwiUk9MRV9VU0VSIl0sImp0aSI6IjY5MDI3NTYxLTJkODEtNG'
                + 'E4Ny04OThmLTMzMjgzOWE3NmIxYSIsImNsaWVudF9pZCI6ImZyb250LWVuZCJ9.eoe-3DTy1DvXr'
                + '9aBjuKeYRB36yapmc4t4JTMvNzr72A',
            token_type: 'bearer',
            refresh_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvcmdhbml6YXRpb25JZCI6IkhhcH'
                + 'B5T3JnYW5pemF0aW9uSWQiLCJ1c2VyX25hbWUiOiJwYXNzZW5nZXIiLCJzY29wZSI6WyJ3ZWJjbG'
                + 'llbnQiXSwiYXRpIjoiNjkwMjc1NjEtMmQ4MS00YTg3LTg5OGYtMzMyODM5YTc2YjFhIiwiZXhwIj'
                + 'oxNTM1NjQwOTg0LCJ1c2VySWQiOiJIYXBweVVzZXJJZCIsImF1dGhvcml0aWVzIjpbIlJPTEVfUE'
                + 'FTU0VOR0VSIiwiUk9MRV9VU0VSIl0sImp0aSI6ImZhMjIxNjQxLTc5YWMtNGJjMS04MzczLTI5ZW'
                + 'FhNTU1OGFjNiIsImNsaWVudF9pZCI6ImZyb250LWVuZCJ9.CWe_lp82AHlplcAJX8yER0pERZwkt'
                + '1M42omrpI1JaZ8',
            expires_in: 99999,
            scope: 'HappyScope'
        };

        authenticationService.login(username, password);

        const req = httpMock.expectOne(`${url}`);
        expect(req.request.method).toBe('POST');
        req.flush(happyResponse);

        expect(localStorage.getItem('accessToken')).toEqual(happyResponse.access_token);
        expect(localStorage.getItem('userId')).toEqual('HappyUserId');
    });

    it('should alert the user errors during authentication', () => {
        const username = 'UnhappyUsername';
        const password = 'UnhappyPassword';
        const error = {
            error: 'invalid_grant',
            error_description: 'Bad credentials'
        };
        const unhappyResponse = {
            message: 'Http failure response for http://localhost:8080/api/userservice/auth/oauth/token: 400 OK',
            name: 'HttpErrorResponse',
            ok: false,
            status: 400,
            statusText: 'OK',
            url: `${url}`
        };

        authenticationService.login(username, password);

        const req = httpMock.expectOne(`${url}`);
        expect(req.request.method).toBe('POST');
        req.flush(error, unhappyResponse);

        expect(window.alert).toHaveBeenCalledWith(error.error_description);
    });

    // it('should navigate to the dashboard if access token exists', (done) => {
    //     router.navigate(['login']);
    //     localStorage.setItem('access_token', 'HappyAccessToken');
    //     authenticationService.checkCredentials();
    //     expect(router.url).toEqual('/dashboard');
    // });

    // it('should remain on login page if access token does not exist', (done) => {
    //     router.navigate(['login']);
    //     localStorage.setItem('access_token', null);
    //     authenticationService.checkCredentials();
    //     expect(router.url).toEqual('/login');
    // });

    // it('should clear out user data and navigate to login page upon logout', fakeAsync(() => {
    //     router.navigate(['dashboard']);
    //     authenticationService.logout();
    //     expect(location.path()).toBe('/login');
    //     // expect(localStorage.length()).toEqual(0);
    // }));
});
