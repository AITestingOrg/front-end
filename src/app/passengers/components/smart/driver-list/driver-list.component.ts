import { Component, OnInit, Input } from '@angular/core';
import { CdkTableModule} from '@angular/cdk/table';
import { MatTableModule} from '@angular/material/table';
import { MatTableDataSource } from '@angular/material';
import { DataSource } from '@angular/cdk/table';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';


@Component({
  selector: 'app-driver-list',
  templateUrl: './driver-list.component.html',
  styleUrls: ['./driver-list.component.scss']
})
export class DriverListComponent{

  displayedColumns = ['id', 'name', 'time', 'rating'];
  dataSource = new MatTableDataSource<Element>(ELEMENT_DATA);
  //dataSource: MockDataSource | null;


  ngOnInit() {
 
  } 
}

export interface Element{
  id:string;
  name:string;
  time:string;
  rating:string;
}
const ELEMENT_DATA: Element[] = [{id:'1', name:'Patrick Alt',time:':58',rating:'3/5'},{id:'2', name:'Madeline Helmstadter',time:'1:02',rating:'4/5'},{id:'3', name:'Jose Perez Clark',time:'1:15',rating:'3/5'},{id:'4', name:'Sandra Hurtado',time:'1:20',rating:'3/5'}];
