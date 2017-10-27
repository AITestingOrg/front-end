import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FeCommonModule } from './common/common.module'

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FeCommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
