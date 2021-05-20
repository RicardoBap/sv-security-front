import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from '../core/material/material.module';

import { LoginFormComponent } from './login-form/login-form.component';


@NgModule({
  declarations: [
    LoginFormComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,

    MaterialModule
  ],
  exports: [
    LoginFormComponent
  ],
  providers: [

  ]
})
export class SegurancaModule { }
