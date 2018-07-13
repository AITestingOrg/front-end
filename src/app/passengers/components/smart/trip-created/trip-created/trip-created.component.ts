import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-trip-created',
  templateUrl: './trip-created.component.html',
  styleUrls: ['./trip-created.component.scss']
})
export class TripCreatedComponent implements OnInit {

private pickupAddress = '2250 N Commerce Pkwy, Weston, FL 33326';
private destinationAddress = '11200 SW 8th St, Miami, FL 33199';
private driver = 'waiting for driver...';

  constructor(
    private route: ActivatedRoute,
    private router: Router ) {}

  ngOnInit() {
    // this.route.queryParams
    // .subscribe(params => {
    //   this.pickupAddress = params['pickupAddress'] || '';
    //   this.destinationAddress = params['destinationAddress'] || '';
    //   this.driver = params['driver'] || '';
    // });
  }

}
