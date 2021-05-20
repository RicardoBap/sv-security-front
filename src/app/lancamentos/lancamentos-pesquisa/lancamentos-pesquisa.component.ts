import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { TooltipPosition } from '@angular/material/tooltip';

import { Lancamento } from 'src/app/core/model/lancamento.model';
import { DialogService } from 'src/app/shared/dialog.service';
import { LancamentoFiltro, LancamentoService } from '../lancamento.service';



@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']  
})
export class LancamentosPesquisaComponent implements OnInit {  

  lancamentos = []
  descricao = new FormControl('')
  dataVencimentoInicio = new FormControl('')
  dataVencimentoFim = new FormControl('')
  size: number
  page: number

  constructor(
    private lancamentoService: LancamentoService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private dialogService: DialogService) { }

  ngOnInit(): void {
    this.pesquisar();
  }

  // TABELA
  displayedColumns: string[] = ['tipo', 'descricao', 'dataVencimento', 'dataPagamento', 'valor', 'pessoa', 'acao'];  
  dataSource = new MatTableDataSource(this.lancamentos);

  // PAGINAÇÃO
  length = 24;
  pageSize = 4; // quantidade de itens
  pageIndex = 0;  // numero da pagina
  pageSizeOptions = [4, 8, 16, 24];
  showFirstLastButtons = true;

  handlePageEvent(event: PageEvent) {
    this.length = event.length;
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex; 
    this.pesquisar()   
  }

  // TOOLTIP
  positionOptions: TooltipPosition[] = ['above'];
  position = new FormControl(this.positionOptions[0]);  

  pesquisar() { 
    console.log('pageIndex'+this.pageIndex)
    this.size = this.pageSize
    this.page = this.pageIndex

    const filtro: LancamentoFiltro = {
      descricao: this.descricao.value,
      dataVencimentoInicio: this.dataVencimentoInicio.value,
      dataVencimentoFim: this.dataVencimentoFim.value,
      size: this.size,      
      page: this.page
    }    

    this.lancamentoService.pesquisar(filtro).subscribe(
      lancamentos => this.lancamentos = lancamentos ,
      error => {
        this.snackBar.open(error.error.error, error.error.status, // Not Found - 404
        { duration: 3000, panelClass: ['snack_error'] })
      }
    )
  }

  // openDialog() {
  //   this.dialog.open(DialogExclusionComponent);
  // }

  // excluir(codigo: Lancamento) {
  //   this.lancamentoService.excluir(codigo).subscribe(
  //     response => {        
  //       this.snackBar.open('Not Content', '204', // Not Content - 204
  //         { duration: 1000, panelClass: ['snack_success'] })
  //       this.pesquisar();
  //     },
  //     error => {
  //       console.log('Erro ao excluir')
  //     }
  //   )
  // }

  excluir(codigo: Lancamento) {
    this.dialogService.openConfirmDialog('Deseja realmente excluir?')
      .afterClosed().subscribe(response => {
        if(response) {
        this.lancamentoService.excluir(codigo).subscribe(
          response => {        
            this.snackBar.open('Not Content', '204', // Not Content - 204
              { duration: 1000, panelClass: ['snack_success'] })
            this.pesquisar();
          },
          error => {
            console.log('Erro ao excluir')
          }
        )  
      }    
    })
  }


}


// export interface Lancamentos {
//   tipo: string;
//   descricao: string;
//   dataVencimento: Date;
//   dataPagamento: Date;
//   valor: number;
//   pessoa: string;
// }





// lancamentos = [
  //   { tipo: 'DESPESA', descricao: 'Compra de pão', dataVencimento: new Date(2021, 4, 23), 
  //     dataPagamento: null, valor: 4.55, pessoa: 'Padaria do José' },
  //   { tipo: 'RECEITA', descricao: 'Venda de software', dataVencimento: new Date(2021, 4, 23), 
  //     dataPagamento: new Date(2020, 4, 23), valor: 80000, pessoa: 'Atacado Brasil' },
  //   { tipo: 'DESPESA', descricao: 'Impostos', dataVencimento: new Date(2021, 4, 23), 
  //     dataPagamento: new Date(2021, 4, 23), valor: 14312, pessoa: 'Ministerio da fazenda' },
  //   { tipo: 'DESPESA', descricao: 'Mensalidade da escola', dataVencimento: new Date(2021, 4, 23), 
  //     dataPagamento: new Date(2021, 4, 23), valor: 800, pessoa: 'Escola Abelha rainha' },
  //   { tipo: 'RECEITA', descricao: 'Venda de carro', dataVencimento: new Date(2021, 4, 23), 
  //     dataPagamento: new Date(2021, 4, 23), valor: 55000, pessoa: 'Sebastiao Souza' },
  //   { tipo: 'DESPESA', descricao: 'Aluguel', dataVencimento: new Date(2021, 4, 23), 
  //     dataPagamento: new Date(2021, 4, 23), valor: 1750, pessoa: 'Casa nova imoveis' },
  //   { tipo: 'DESPESA', descricao: 'Mensalidade musculação', dataVencimento: new Date(2021, 4, 23), 
  //     dataPagamento: new Date(2021, 4, 23), valor: 180, pessoa: 'Academia top' }
  // ]