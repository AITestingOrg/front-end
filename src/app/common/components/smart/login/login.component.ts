import { Component, Input } from '@angular/core';
import { AuthenticationService } from '../../../../common/states/authentication.service';

@Component({
  selector: 'app-login',
  providers: [AuthenticationService],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginData = {username: '', password: '', rememberUser: false};

  constructor(private _service: AuthenticationService) {}

  login() {
    this._service.obtainAccessToken(this.loginData);
  }

  register() {}

}
