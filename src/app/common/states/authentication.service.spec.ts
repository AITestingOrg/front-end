import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { TestBed, getTestBed } from '@angular/core/testing';
import { AuthenticationService } from './authentication.service';
import { Component } from '@angular/core';

describe('AuthenticationService', () => {
    let injector: TestBed;
    let authenticationService: AuthenticationService;
    let httpMock: HttpTestingController;
    let router: Router;
    const url = 'http://localhost:8080/api/userservice/auth/oauth/token';

    @Component({template: '<h1>login</h1>'})
    class TestLoginComponent {}

    @Component({template: '<h1>dashboard</h1>'})
    class TestTripPlannerComponent {}

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                TestLoginComponent,
                TestTripPlannerComponent
            ],
            imports: [
                RouterTestingModule.withRoutes(
                    [{path: 'login', component: TestLoginComponent}, {path: 'dashboard', component: TestTripPlannerComponent}]
                ),
                HttpClientTestingModule
            ],
            providers: [AuthenticationService]
        });
        injector = getTestBed();
        authenticationService = injector.get(AuthenticationService);
        httpMock = injector.get(HttpTestingController);
        router = injector.get(Router);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should successfully get the access token', (done) => {
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

        expect(localStorage.getItem('access_token')).toEqual(happyResponse.access_token);
        expect(localStorage.getItem('userId')).toEqual('HappyUserId');
    });
});
