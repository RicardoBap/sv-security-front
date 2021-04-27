import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MAT_DATE_LOCALE } from '@angular/material/core';

import { CurrencyMaskModule } from 'ng2-currency-mask';
import { MaterialModule } from '../core/material/material.module';

import { LancamentoCadastroComponent } from './lancamento-cadastro/lancamento-cadastro.component';
import { LancamentosPesquisaComponent } from './lancamentos-pesquisa/lancamentos-pesquisa.component';

@NgModule({
  declarations: [
    LancamentosPesquisaComponent,
    LancamentoCadastroComponent, 
  ],
  imports: [
    CommonModule,
    FlexLayoutModule, 

    FormsModule,
    ReactiveFormsModule,
    MaterialModule,

    CurrencyMaskModule    
  ],
  exports: [
    LancamentosPesquisaComponent,
    LancamentoCadastroComponent
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },    
  ],
})
export class LancamentosModule { }
