import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FeCommonModule } from './common/common.module';
import { AppComponent } from './app.component';

import { MatButtonModule, MatCheckboxModule} from '@angular/material';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FeCommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
