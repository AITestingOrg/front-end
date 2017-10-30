import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  loginUser(user, pass) {
    console.log('clicked login');
  }

  registerUser() {
    console.log('clicked register');
  }

}
