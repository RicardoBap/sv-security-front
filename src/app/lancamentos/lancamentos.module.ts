import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MAT_DATE_LOCALE } from '@angular/material/core';

import { CurrencyMaskModule } from 'ng2-currency-mask';
import { MaterialModule } from '../core/material/material.module';

import { LancamentoCadastroComponent } from './lancamento-cadastro/lancamento-cadastro.component';
import { LancamentosPesquisaComponent } from './lancamentos-pesquisa/lancamentos-pesquisa.component';
import { DialogExclusionComponent } from '../shared/dialog-exclusion/dialog-exclusion.component';

@NgModule({
  declarations: [
    LancamentosPesquisaComponent,
    LancamentoCadastroComponent,
    DialogExclusionComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    RouterModule,

    FormsModule,
    ReactiveFormsModule,
    MaterialModule,

    CurrencyMaskModule    
  ],
  exports: [
    // LancamentosPesquisaComponent,
    // LancamentoCadastroComponent
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },    
  ],
})
export class LancamentosModule { }
