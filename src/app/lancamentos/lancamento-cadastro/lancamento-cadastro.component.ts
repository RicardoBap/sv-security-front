import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Categoria } from 'src/app/core/model/categoria.model';
import { PessoaResumoModel } from 'src/app/core/model/pessoaResumoModel.model';

import { CategoriasService } from 'src/app/categorias/categorias.service';
import { PessoaService } from 'src/app/pessoas/pessoa.service';

import { Observable } from 'rxjs';
import { LancamentoService } from '../lancamento.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Lancamento } from 'src/app/core/model/lancamento.model';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {

  tipoLabel: string = 'RECEITA'

  simpleReqCategoriasObs: Observable <Array<Categoria>>;
  simpleReqPessoasObs: Observable <Array<PessoaResumoModel>>;

  lancamento: Lancamento;
  lancamentoForm: FormGroup
  editando: boolean = false

  codigoLancamento: string

  @ViewChild('form') form: NgForm;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private pessoaService: PessoaService,
    private categoriaService: CategoriasService,
    private lancamentoService: LancamentoService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.configurarFormulario();
    //console.log(this.route.snapshot.params['codigo'])
    const codigoLancamento = this.route.snapshot.params['codigo']
    if(codigoLancamento) {
      this.carregarLancamento(codigoLancamento)
    }
    this.carregarCategorias();
    this.carregarPessoas();   
  }

  carregarLancamento(codigo: number) {
    this.editando = true
    this.lancamentoService.buscarPeloCodigo(codigo).subscribe(
      response => {
        this.lancamento = response
        console.log(this.lancamento)
        this.lancamentoForm.patchValue(this.lancamento)
      }
    )
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
      dataVencimento: [null, [Validators.required]],
      dataPagamento: [null],
      descricao: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      valor: [null, [Validators.required, Validators.min(0)]],
      observacao: [null],
      pessoa: this.formBuilder.group({
        codigo: [null, Validators.required]
        //nome: []
      }),
      categoria: this.formBuilder.group({
        codigo: [null, Validators.required]
        //nome: []
      })
    })
  }

  salvar() {
    if(this.editando) {
      this.atualizarLancamento()
    } else {
      this.adicionarLancamento()
    }
  }

  atualizarLancamento() {
    this.lancamentoService.atualizar(this.lancamentoForm.value, this.lancamentoForm.get('codigo').value).subscribe(
      response => {
        this.lancamento = response
        //console.log('ATUALIZAR LANCAMENTO' + this.lancamento)
        this.lancamentoForm.patchValue(this.lancamento)
        this.snackBar.open('OK', '200', 
        { duration: 1000, panelClass: ['snack_success'] })
      },
      error => {}
    )    
  }


  adicionarLancamento() {
    //console.log(this.lancamentoForm.value);
    this.lancamentoService.adicionar(this.lancamentoForm.value).subscribe(
      // response => { console.log('8888888888888' + response.headers.get('Location'))
      response => { 
      this.codigoLancamento = this.extractCodigo(response.headers.get('Location'));
        this.snackBar.open('Lancamento número: ' + this.codigoLancamento, '201', 
          { duration: 1000, panelClass: ['snack_success'] })
      this.router.navigate(['/lancamentos', this.codigoLancamento]) // <---- ATENÇÃO
      },
      error => {}
    )
  }

  // novo() {
  //   setTimeout(function() {
  //     this.lancamento = new Lancamento();
  //   }.bind(this), 1)
  //   this.router.navigate(['/lancamentos/novo']);
  // }

  private extractCodigo(location: string): string {
    let position = location.lastIndexOf('/');
    return location.substring(position + 1, location.length)
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


// loadForm(lancamento: Lancamento){
  //   this.lancamentoForm = this.formBuilder.group({    
  //     codigo: [this.lancamento.codigo],
  //     tipo: [this.lancamento.tipo],
  //     dataVencimento: [this.lancamento.dataVencimento],
  //     dataPagamento: [this.lancamento.dataPagamento],
  //     descricao: [this.lancamento.descricao],
  //     valor: [this.lancamento.valor],
  //     observacao: [this.lancamento.observacao],
  //     categoria: this.formBuilder.group({
  //       codigo: [this.lancamento.categoria.codigo]
  //     }),
  //     pessoa: this.formBuilder.group({
  //       codigo: [this.lancamento.pessoa.codigo]
  //     })
  //   })
  // }