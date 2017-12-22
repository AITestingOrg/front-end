import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeCommonModule } from 'app/common/common.module';
import { MatTableModule} from '@angular/material';
import { CdkTableModule, DataSource} from '@angular/cdk/table';
//import { DriverListComponent } from './components/smart/driver-list/driver-list.component';
import { TempComponent } from './components/presentation/temp/temp.component';

@NgModule({
  imports: [
    CommonModule, FeCommonModule, CdkTableModule
  ],
  declarations: [ TempComponent],  
  exports: [CdkTableModule,MatTableModule, TempComponent],
})
export class PassengersModule { }
