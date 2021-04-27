import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {

  tipoLabel: string = 'RECEITA'

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

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  lancamentoForm = this.formBuilder.group({
    tipos: ['RECEITA', [Validators.required]],
    dataVencimento: ['', [Validators.required]],
    dataPagamento: [''],
    descricao: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
    valor: ['', [Validators.required, Validators.min(0)]],
    categoria: ['', [Validators.required]],
    pessoa: ['', Validators.required],
    observacao: ['']
  })

  submit() {
    console.log(this.lancamentoForm.value);
  }  


}
