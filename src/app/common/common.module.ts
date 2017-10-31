import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextBoxComponent } from './components/presentation/text-box/text-box.component';
import { LoginComponent } from './components/smart/login/login.component';
import { CheckBoxComponent } from './components/presentation/check-box/check-box.component';
import { ToolbarComponent } from './components/presentation/toolbar/toolbar.component';
import { RaisedButtonComponent } from './components/presentation/raised-button/raised-button.component';
import { BasicButtonComponent } from './components/presentation/basic-button/basic-button.component';
import { MatToolbarModule, MatCheckboxModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatIconModule} from '@angular/material';

@NgModule({
  imports: [
    CommonModule, MatToolbarModule, MatCheckboxModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatIconModule
  ],
  declarations: [TextBoxComponent, LoginComponent, CheckBoxComponent, ToolbarComponent, RaisedButtonComponent, BasicButtonComponent],
  exports: [LoginComponent, TextBoxComponent, CheckBoxComponent, ToolbarComponent, RaisedButtonComponent, MatFormFieldModule],
})
export class FeCommonModule { }
