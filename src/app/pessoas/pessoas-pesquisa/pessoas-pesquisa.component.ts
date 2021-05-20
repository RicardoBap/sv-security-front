import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TooltipPosition } from '@angular/material/tooltip';
import { PessoaService } from '../pessoa.service';


@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent implements OnInit {

  pessoas = []

  constructor(private service: PessoaService) { }

  ngOnInit(): void {
    this.pesquisar()
  }

  // TABELA
  displayedColumns: string[] = ['nome', 'telefone', 'email', 'encargo', 'status', 'acao'];  
  dataSource = new MatTableDataSource(this.pessoas);

  // PAGINADOR
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  // TOOLTIP
  positionOptions: TooltipPosition[] = ['above'];
  position = new FormControl(this.positionOptions[0]);

  pesquisar() {
    this.service.pesquisar()
      .then(pessoas => this.pessoas = pessoas)
  }

}


// export interface Pessoas {
//   nome: string;
//   telefone: string;
//   email: string;
//   encargo: string;
//   status: boolean;
// }

// const ELEMENT_DATA: Pessoas[] = [
//   { nome: "Gilmar" , telefone: "(019) 98944-5422", email: "gilmar@mail.com", encargo: "Tesoureiro", status: true},
//   { nome: "Roberto" , telefone: "(019) 92466-2999",  email: "roberto@mail.com", encargo: "RSG", status: true},
//   { nome: "Mello" , telefone: null, email: "mell0@mail.com", encargo: "Membro", status: true},
//   { nome: "Rogério" , telefone: "(019) 94455-3223", email: "rogerio@mail.com", encargo: "Membro", status: false},
//   { nome: "Ricardo" , telefone: "(019) 99659-2800", email: "ricardo@mail.com", encargo: "Secretário", status: true},
//   { nome: "Orlando" , telefone: "(019) 3226-5500", email: "orlando@mail.com", encargo: "Membro", status: false},
//   { nome: "Bueno" , telefone: "(019) 91122-2211",  email: "bueno@mail.com", encargo: "Membro", status: true},
//   { nome: "Barreto" , telefone: "(019) 3226-0000", email: "barreto@mail.com", encargo: "RSG-Suplente", status: true}
// ]