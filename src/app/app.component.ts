import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Route } from 'app/common/models/route';
import { Store } from '@ngrx/store';
import * as RouteObj from 'app/common/states/actions/app.action';

interface AppState {
  route: Route;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'UltiCar';
  route: Observable<Route>;

  constructor(private store: Store<AppState>) {
    this.route = store.select('route');
  }

  setOrigin() {
    this.store.dispatch(new RouteObj.DetermineRoute());
  }
}
