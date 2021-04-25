import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TooltipPosition } from '@angular/material/tooltip';

export interface Pessoas {
  nome: string;
  telefone: string;
  encargo: string;
  status: boolean;
}

const ELEMENT_DATA: Pessoas[] = [
  { nome: "Gilmar" , telefone: "(019) 98944-5422", encargo: "Tesoureiro", status: true},
  { nome: "Roberto" , telefone: "(019) 92466-2999", encargo: "RSG", status: true},
  { nome: "Mello" , telefone: null, encargo: "Membro", status: true},
  { nome: "Rogério" , telefone: "(019) 94455-3223", encargo: "Membro", status: false},
  { nome: "Ricardo" , telefone: "(019) 99659-2800", encargo: "Secretário", status: true},
  { nome: "Orlando" , telefone: "(019) 3226-5500", encargo: "Membro", status: false},
  { nome: "Bueno" , telefone: "(019) 91122-2211", encargo: "Membro", status: true},
  { nome: "Barreto" , telefone: "(019) 3226-0000", encargo: "RSG-Suplente", status: true}
]

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  displayedColumns: string[] = ['nome', 'telefone', 'encargo', 'status', 'acao'];  
  dataSource = new MatTableDataSource<Pessoas>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  positionOptions: TooltipPosition[] = ['above'];
  position = new FormControl(this.positionOptions[0]);

}
