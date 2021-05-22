import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { MaterialModule } from './material/material.module';

import { SegurancaModule } from '../seguranca/seguranca.module';
import { PessoasModule } from '../pessoas/pessoas.module';
import { LancamentosModule } from '../lancamentos/lancamentos.module';
import { CategoriasModule } from '../categorias/categorias.module';

import { AuthService } from '../seguranca/auth.service';
import { PessoaService } from '../pessoas/pessoa.service';
import { LancamentoService } from '../lancamentos/lancamento.service';
import { StorageService } from '../seguranca/storage.service';

import { NavbarComponent } from './navbar/navbar.component';
import { DialogExclusionComponent } from '../shared/dialog-exclusion/dialog-exclusion.component';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada.component';


@NgModule({
  declarations: [
    NavbarComponent,
    PaginaNaoEncontradaComponent
  ],
  imports: [
    CommonModule,
    RouterModule,

    MaterialModule,

    PessoasModule,
    LancamentosModule,
    SegurancaModule,
    CategoriasModule
  ],
  exports: [
    NavbarComponent,

    PessoasModule,
    LancamentosModule,
    CategoriasModule,

    SegurancaModule,
  ],
  providers: [
    LancamentoService,
    PessoaService,
    AuthService,
    StorageService,
    Title
  ],
  entryComponents: [ DialogExclusionComponent ],
})
export class CoreModule { }