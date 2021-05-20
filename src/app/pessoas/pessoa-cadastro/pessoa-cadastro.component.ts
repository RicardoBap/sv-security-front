import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  pessoaForm = this.formBuilder.group({
    nome: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],    
    telefone: ['', [Validators.required]],
    email: ['', [Validators.required]],
    encargo: ['', [Validators.required]]
  })

  submit() {
    console.log(this.pessoaForm.value)
  }

}
