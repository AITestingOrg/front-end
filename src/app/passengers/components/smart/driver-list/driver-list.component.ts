import { Component, OnInit, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { APIGatewayService } from 'app/common/services/api-gateway.service';
import { Router } from '@angular/router';
import { MessageService } from 'app/common/services/message.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-driver-list',
  templateUrl: './driver-list.component.html',
  styleUrls: ['./driver-list.component.scss']
})
export class DriverListComponent{
  message: any;
  subscription: Subscription;

  displayedColumns = ['id', 'name', 'distance', 'rating'];
  dataSource: MatTableDataSource<DriverData>; 

  constructor(
    private apiGatewayService:APIGatewayService, 
    private router:Router,
    private messageService:MessageService) 
    {
    var drivers = new Array<DriverData>();
    this.dataSource = new MatTableDataSource<DriverData>(drivers);
    this.subscription = this.messageService.getMessageTest().subscribe(message => {
      this.message = message;
    })
  }

  ngOnInit() {
    this.apiGatewayService.getAvailableDrivers().then(result => { 
      this.fillTableWithDriverData(result); 
    }); 
  } 

  fillTableWithDriverData(result) { 
    //Reset Driver Data Arrays 
    driverNames = []; 
    driverIds = []; 
    driverRatings = []; 
    driverDistances = []; 
    //Map Values of Result to DriverData Fields 
    result.map(x => { 
      driverNames.push(x.fname); 
      driverIds.push(x.id); 
      driverRatings.push(x.rating); 
      driverDistances.push(x.distance); 
    }) 
    //Fill Table's Data Source with Mapping Results 
    var drivers = new Array<DriverData>(); 
    for (let i = 0; i < driverNames.length; i++) { 
      drivers.push(new DriverData(driverNames[i], driverIds[i], driverDistances[i], driverRatings[i])); 
    } 
    this.dataSource = new MatTableDataSource(drivers); 
  } 

  selectDriver(event, driver) {
    this.router.navigateByUrl('/trip-confirmation');
    // var driverName = driver.name;
    // var driverId = driver.id;
    // var driverDistance = driver.minutesAway;
    // var driverRank = driver.rank;
    // this.messageService.sendMessageTest("The selected driver was: " + driverName);
  }

}

var driverNames = [];
var driverDistances = [];
var driverIds = [];
var driverRatings = [];

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
