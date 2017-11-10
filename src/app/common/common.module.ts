import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TextBoxComponent } from './components/presentation/text-box/text-box.component';
import { LoginComponent } from './components/smart/login/login.component';
import { CheckBoxComponent } from './components/presentation/check-box/check-box.component';
import { ToolbarComponent } from './components/presentation/toolbar/toolbar.component';
import { RaisedButtonComponent } from './components/presentation/raised-button/raised-button.component';
import { BasicButtonComponent } from './components/presentation/basic-button/basic-button.component';
import { IconButtonComponent } from './components/presentation/icon-button/icon-button.component';
import { MatToolbarModule, MatCheckboxModule, MatButtonModule, MatFormFieldModule, MatFormFieldControl, MatInputModule, MatIconModule, MatCardModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule, MatToolbarModule, MatCheckboxModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatIconModule, MatCardModule, FormsModule
  ],
  declarations: [TextBoxComponent, LoginComponent, CheckBoxComponent, ToolbarComponent, RaisedButtonComponent, BasicButtonComponent, IconButtonComponent],
  exports: [ToolbarComponent],
})

export class FeCommonModule { }
