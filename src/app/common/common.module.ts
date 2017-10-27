import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextBoxComponent } from './components/presentation/text-box/text-box.component';
import { LoginComponent } from './components/smart/login/login.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [TextBoxComponent, LoginComponent]
})
export class FeCommonModule { }
