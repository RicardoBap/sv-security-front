import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TooltipPosition } from '@angular/material/tooltip';

export interface Lancamentos {
  tipo: string;
  descricao: string;
  dataVencimento: Date;
  dataPagamento: Date;
  valor: number;
  pessoa: string;
}

const ELEMENT_DATA: Lancamentos[] = [
  { tipo: 'DESPESA', descricao: 'Compra de pão', dataVencimento: new Date(2021, 4, 23), 
    dataPagamento: null, valor: 4.55, pessoa: 'Padaria do José' },
  { tipo: 'RECEITA', descricao: 'Venda de software', dataVencimento: new Date(2021, 4, 23), 
    dataPagamento: new Date(2020, 4, 23), valor: 80000, pessoa: 'Atacado Brasil' },
  { tipo: 'DESPESA', descricao: 'Impostos', dataVencimento: new Date(2021, 4, 23), 
    dataPagamento: new Date(2021, 4, 23), valor: 14312, pessoa: 'Ministerio da fazenda' },
  { tipo: 'DESPESA', descricao: 'Mensalidade da escola', dataVencimento: new Date(2021, 4, 23), 
    dataPagamento: new Date(2021, 4, 23), valor: 800, pessoa: 'Escola Abelha rainha' },
  { tipo: 'RECEITA', descricao: 'Venda de carro', dataVencimento: new Date(2021, 4, 23), 
    dataPagamento: new Date(2021, 4, 23), valor: 55000, pessoa: 'Sebastiao Souza' },
  { tipo: 'DESPESA', descricao: 'Aluguel', dataVencimento: new Date(2021, 4, 23), 
    dataPagamento: new Date(2021, 4, 23), valor: 1750, pessoa: 'Casa nova imoveis' },
  { tipo: 'DESPESA', descricao: 'Mensalidade musculação', dataVencimento: new Date(2021, 4, 23), 
    dataPagamento: new Date(2021, 4, 23), valor: 180, pessoa: 'Academia top' }
]

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']  
})
export class LancamentosPesquisaComponent implements OnInit, AfterViewInit {

  constructor() { }

  ngOnInit(): void {
  }

  displayedColumns: string[] = ['tipo', 'descricao', 'dataVencimento', 'dataPagamento', 'valor', 'pessoa', 'acao'];  
  dataSource = new MatTableDataSource<Lancamentos>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  positionOptions: TooltipPosition[] = ['above'];
  position = new FormControl(this.positionOptions[0]);

}
