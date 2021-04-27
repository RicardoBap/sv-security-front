import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MAT_DATE_LOCALE } from '@angular/material/core';

import { MaterialModule } from './material.module';

import { NavbarComponent } from './navbar/navbar.component';
import { LancamentosModule } from './lancamentos/lancamentos.module';
import { PessoasModule } from './pessoas/pessoas.module';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent      
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule, 
    
    MaterialModule,
    
    LancamentosModule,
    PessoasModule
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
