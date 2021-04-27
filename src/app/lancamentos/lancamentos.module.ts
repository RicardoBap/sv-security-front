import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LancamentoCadastroComponent } from './lancamento-cadastro/lancamento-cadastro.component';
import { LancamentosPesquisaComponent } from './lancamentos-pesquisa/lancamentos-pesquisa.component';
import { MaterialModule } from '../material.module';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

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

    CurrencyMaskModule,

    MaterialModule
  ],
  exports: [
    LancamentosPesquisaComponent,
    LancamentoCadastroComponent
  ]
})
export class LancamentosModule { }
