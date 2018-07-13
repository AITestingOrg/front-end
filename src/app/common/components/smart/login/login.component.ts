import { Component, OnInit, Input, ElementRef, NgZone, ViewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule, Router } from '@angular/router';
import { HttpClient } from 'selenium-webdriver/http';
import { LoginAuthenticationService } from 'app/services/login-authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private usernameValue = '';
  private passwordValue = '';
  private userRole = 'ROLE_PASSENGER';

  constructor(
    private router: Router,
    private auth: LoginAuthenticationService
  ) { }

   @Input() private disabled:string

  ngOnInit() {
  }

  usernameChange(event){
    this.usernameValue += event.key;
  }
  
  passwordChange(event){
    this.passwordValue += event.key;
  }

  //Todo signin through edge-service
  signIn(event) {

    let token = {};

    const onSuccess = response => {

      token = response.access_token;

      if(this.userRole == 'ROLE_DRIVER' || this.usernameValue.trim() == 'driver'){
        this.router.navigate(['/driver-dashboard']);
        }else{
        this.router.navigate(['/dashboard']);
        }
    }

    const onFailure = error => {
      console.log(error);
    }

    this.auth.login(this.usernameValue, this.passwordValue).subscribe(onSuccess, onFailure);

  }

  register(event) {
    console.log("Registered: " + event);
  }

  rememberUser(event, checkboxValue) {
    if(checkboxValue) {
    console.log("Will remember.");
    } else {
      console.log("Will not remember.")
    }
  }

  rememberUserValue = true;

}
