import { Component, OnInit, Input } from '@angular/core';
import { CdkTableModule} from '@angular/cdk/table';
import { MatTableModule} from '@angular/material/table';
import { MatTableDataSource } from '@angular/material';
import { DataSource } from '@angular/cdk/table';
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
  drivers = new Array<DriverData>();  
  dataSource = new MatTableDataSource(this.drivers);

  constructor(private apiGatewayService:APIGatewayService) {}

  ngOnInit() {
    this.apiGatewayService.getAvailableDrivers("416 Sailboat Circle").then(result => {
      console.log(result);
      this.fillTableWithDriverData(result);
    });
    console.log("Results from getAvailableDrivers in DL Component");
  } 

  fillTableWithDriverData(result) {
    DRIVER_NAMES = [];
    result.map(x => {
      DRIVER_NAMES.push(x.fname);
      DRIVER_IDS.push(x.id);
      DRIVER_RATINGS.push(x.rating);
      DRIVER_TIMES.push(x.distanceSeconds);
    })
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