import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule} from '@angular/material';
import { CdkTableModule, DataSource} from '@angular/cdk/table';
import { DriverListComponent } from './components/smart/driver-list/driver-list.component';

@NgModule({
  imports: [
    CommonModule, DriverListComponent
  ],
  exports: [CdkTableModule,MatTableModule],
  declarations: [DriverListComponent, CdkTableModule]
})
export class PassengersModule { }
