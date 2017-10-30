import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextBoxComponent } from './components/presentation/text-box/text-box.component';
import { LoginComponent } from './components/smart/login/login.component';
import { CheckBoxComponent } from './components/presentation/check-box/check-box.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [TextBoxComponent, LoginComponent, CheckBoxComponent],
  exports: [ 
    LoginComponent, TextBoxComponent, CheckBoxComponent]
})
export class FeCommonModule { }
