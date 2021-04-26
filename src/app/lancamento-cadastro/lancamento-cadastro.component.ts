import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {

  tipos: string = 'RECEITA';

  categorias = [
    { label: 'Alimentação', value: '1' },
    { label: 'Transporte', value: '2' },
    { label: 'Financiamento', value: '3' }
  ]

  pessoas = [
    { label: 'Joao da Silva', value: '1' },
    { label: 'Ricardo Kumagae', value: '2' },
    { label: 'Roberto Simões', value: '3' },
    { label: 'Juliana Paes', value: '4' }  
    
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
