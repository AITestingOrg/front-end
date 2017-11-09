import { Component, OnInit, Input } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router) { }

   @Input() private disabled:string

  ngOnInit() {
  }

  signIn(event) {
    console.log("Signed in: " + event);
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
  usernameValue = "";
  passwordValue = "";

}
