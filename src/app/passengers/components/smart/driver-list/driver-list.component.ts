import { Component, OnInit, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { APIGatewayService } from 'app/common/services/api-gateway.service';


@Component({
  selector: 'app-driver-list',
  templateUrl: './driver-list.component.html',
  styleUrls: ['./driver-list.component.scss']
})
export class DriverListComponent{

  displayedColumns = ['id', 'name', 'time', 'rating'];
  dataSource: MatTableDataSource<DriverData>;

  constructor(private apiGatewayService:APIGatewayService) {
    var drivers = new Array<DriverData>();  
    this.dataSource = new MatTableDataSource(drivers);
  }

  ngOnInit() {
    this.apiGatewayService.getAvailableDrivers().then(result => {
      console.log("Before filling table, result: ");
      console.log(result);
      this.fillTableWithDriverData(result);
    });
  } 

  fillTableWithDriverData(result) {
    //Reset Driver Data Arrays
    DRIVER_NAMES = [];
    DRIVER_IDS = [];
    DRIVER_RATINGS = [];
    DRIVER_TIMES = [];
    //Map Values of Result to DriverData Fields
    result.map(x => {
      DRIVER_NAMES.push(x.fname);
      DRIVER_IDS.push(x.id);
      DRIVER_RATINGS.push(x.rating);
      DRIVER_TIMES.push(x.distanceSeconds);
    })
    //Fill Table's Data Source with Mapping Results
    var drivers = new Array<DriverData>();
    for (let i = 0; i < DRIVER_NAMES.length; i++) {
      drivers.push(new DriverData(DRIVER_NAMES[i], DRIVER_IDS[i], DRIVER_TIMES[i], DRIVER_RATINGS[i]));
    }
    this.dataSource = new MatTableDataSource(drivers);
  }
}

var DRIVER_NAMES = [];
var DRIVER_TIMES = [];
var DRIVER_IDS = [];
var DRIVER_RATINGS = [];

  class DriverData {
    name:string;
    id:string;
    minutesAway:string;
    rank:string;

    constructor(name:string, id:string, minutesAway:string, rank:string) {
      this.name = name;
      this.id = id;
      this.minutesAway = minutesAway;
      this.rank = this.rank;
    }
  }