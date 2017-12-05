import { Component, OnInit } from '@angular/core';
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
  displayedColumns = ['driverID', 'driverName', 'driverTime', 'driverRating'];
  dataSource = new MatTableModule;
  mockDatabase = new MockDatabase();
  //dataSource: MockDataSource | null;


  ngOnInit() {
    this.dataSource = new MockDataSource(this.mockDatabase);
  } 
}

const ELEMENT_DATA: TableData[] = [{id:'1', name:'sandra',time:'2::00',rating:'3/5'}];
const NAMES = ['Patrick Alt', 'Justin Phillips', 'Madeline Helmstadter', 'Jose Perez Clark'];
const TIMES = ['2:00', '5:00', '8:15', '15:00'];

export interface TableData{
  id:string;
  name:string;
  time:string;
  rating:string;
}

export class MockDatabase{

  dataChange: BehaviorSubject<TableData[]> = new BehaviorSubject<TableData[]>([]);
  get data(): TableData [] {return this.dataChange.value;}

  constructor() {
    for (let i = 0; i <= 4; i++)
    {
      this.addDriver();
    }
  }

  addDriver(){
    const copiedData = this.data.slice();
    copiedData.push(this.createNewDriver());
    this.dataChange.next(copiedData);
  }

  private createNewDriver(){
    const name =
    NAMES[Math.round(Math.random() * (NAMES.length - 1))] + ' ' +
    NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) + '.';

return {
  id: (this.data.length + 1).toString(),
  name: name,
  time: Math.round(Math.random() * 100).toString(),
  rating: TIMES[Math.round(Math.random() * (TIMES.length - 1))]
};

  }
}

export class MockDataSource extends DataSource<any>{
  constructor(private _mockDatabase: MockDatabase){
    super();
  }

   connect(): Observable<TableData[]>{
     return this._mockDatabase.dataChange;
   }

   disconnect(){}

}
