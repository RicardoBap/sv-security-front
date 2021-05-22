import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';

import { MaterialModule } from '../core/material/material.module';

import { PessoaCadastroComponent } from './pessoa-cadastro/pessoa-cadastro.component';
import { PessoasPesquisaComponent } from './pessoas-pesquisa/pessoas-pesquisa.component';

@NgModule({
  declarations: [
    PessoasPesquisaComponent,    
    PessoaCadastroComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule, 

    FormsModule,
    ReactiveFormsModule,
    MaterialModule,

    NgxMaskModule.forRoot()    
  ],
  exports: [
    // PessoasPesquisaComponent,
    // PessoaCadastroComponent
  ]
})
export class PessoasModule { }
