import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
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
  novoStatus: boolean

  constructor(
    private service: PessoaService,
    private snackBar: MatSnackBar    
  ) { }

  ngOnInit(): void {
    this.pesquisar()
  }

  // TABELA
  displayedColumns: string[] = ['nome', 'telefone', 'email', 'status', 'encargo', 'acao'];  
  dataSource = new MatTableDataSource(this.pessoas);

  // PAGINADOR
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  // TOOLTIP
  positionOptions: TooltipPosition[] = ['above'];
  position = new FormControl(this.positionOptions[0]);
  message: String
 
  pesquisar() {
    this.service.pesquisar().subscribe(
      pessoas => this.pessoas = pessoas
    )
  }  

  alternarStatus(pessoa: any) {
    this.novoStatus = !pessoa.ativo;
    //this.message = this.novoStatus ? 'desativar' : 'ativar'; // <--TOOLTIP

    this.service.mudarStatus(pessoa.codigo, this.novoStatus).subscribe(
      response => {

        pessoa.ativo = this.novoStatus
        this.pesquisar()  //<-----------atualiza o status       

        this.snackBar.open('No Content', '204', 
        { duration: 1000, panelClass: ['snack_success'] })
      },
      error => {
        this.snackBar.open('Bad Request', '400', 
        { duration: 1000, panelClass: ['snack_error'] })
      }
    )    
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