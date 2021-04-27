import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PessoaCadastroComponent } from './pessoa-cadastro/pessoa-cadastro.component';
import { PessoasPesquisaComponent } from './pessoas-pesquisa/pessoas-pesquisa.component';
import { MaterialModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { FlexLayoutModule } from '@angular/flex-layout';

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

    NgxMaskModule.forRoot(),

    MaterialModule
  ],
  exports: [
    PessoasPesquisaComponent,
    PessoaCadastroComponent
  ]
})
export class PessoasModule { }
