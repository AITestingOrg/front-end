import { Component, OnInit, Input } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private router : Router;

  constructor(router: Router) { 
    this.router = router;
  }

   @Input() private disabled:string

  ngOnInit() {
  }

  signIn(event) {
    this.router.navigateByUrl('/dashboard');
  }

  register(event) {
    console.log("Registered: " + event);
  }

  rememberUserValue = true;
  usernameValue = "";
  passwordValue = "";

}
