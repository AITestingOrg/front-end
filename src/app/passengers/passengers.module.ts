import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeCommonModule } from 'app/common/common.module';
import { MatTableModule} from '@angular/material';
import { CdkTableModule, DataSource} from '@angular/cdk/table';
import { DriverListComponent } from './components/smart/driver-list/driver-list.component';

@NgModule({
  imports: [
    CommonModule, DriverListComponent, FeCommonModule
  ],
  declarations: [DriverListComponent, CdkTableModule],  
  exports: [CdkTableModule,MatTableModule],
})
export class PassengersModule { }
