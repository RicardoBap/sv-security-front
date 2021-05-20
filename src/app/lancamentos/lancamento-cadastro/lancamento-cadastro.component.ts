import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Categoria } from 'src/app/core/model/categoria.model';
import { PessoaResumoModel } from 'src/app/core/model/pessoaResumoModel.model';

import { CategoriasService } from 'src/app/categorias/categorias.service';
import { PessoaService } from 'src/app/pessoas/pessoa.service';

import { Observable } from 'rxjs';
import { LancamentoService } from '../lancamento.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {

  tipoLabel: string = 'RECEITA'

  simpleReqCategoriasObs: Observable <Array<Categoria>>;
  simpleReqPessoasObs: Observable <Array<PessoaResumoModel>>;

  lancamentoForm: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private pessoaService: PessoaService,
    private categoriaService: CategoriasService,
    private lancamentoService: LancamentoService,
    private snackBar: MatSnackBar
    ) { }

  ngOnInit(): void {
    this.configurarFormulario();
    console.log(this.route.snapshot.params['codigo'])
    this.carregarCategorias();
    this.carregarPessoas();
  }


  carregarCategorias() {
    this.simpleReqCategoriasObs = this.categoriaService.carregarCategorias();
  }

  carregarPessoas() {
    this.simpleReqPessoasObs = this.pessoaService.carregarPessoas()
  }

  configurarFormulario() {
    this.lancamentoForm = this.formBuilder.group({
      codigo: [],
      tipo: ['RECEITA', [Validators.required]],
      dataVencimento: ['', [Validators.required]],
      dataPagamento: [''],
      descricao: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      valor: ['', [Validators.required, Validators.min(0)]],
      observacao: [''],
      // categoria: ['', [Validators.required]],
      // pessoa: ['', Validators.required]  
      categoria: this.formBuilder.group({
        codigo: [null, Validators.required]
      }),
      pessoa: this.formBuilder.group({
        codigo: [null, Validators.required]
      })    
    })
  }


  salvar() {
    console.log(this.lancamentoForm.value);
    this.lancamentoService.adicionar(this.lancamentoForm.value).subscribe(
      //response => { console.log(response.headers.get('location'))
      response => { console.log('8888888888888' + response)
      this.snackBar.open('Lançamento adicionado', '201', 
        { duration: 1000, panelClass: ['snack_success'] })
      },
      error => {}
    )
  }
  
 


}



 // categorias = [
  //   { label: 'Alimentação', value: '1' },
  //   { label: 'Transporte', value: '2' },
  //   { label: 'Financiamento', value: '3' }
  // ]

  // pessoas = [
  //   { label: 'Joao da Silva', value: '1' },
  //   { label: 'Ricardo Kumagae', value: '2' },
  //   { label: 'Roberto Simões', value: '3' },
  //   { label: 'Juliana Paes', value: '4' }     
  // ]