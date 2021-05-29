import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Pessoa } from 'src/app/core/model/pessoa.model';
import { PessoaService } from '../pessoa.service';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit {

  pessoa: Pessoa
  editando: boolean = false;

  encargoLista: string[] = [
    'ADMIN',
    'MEMBRO',
    'RSG',
    'SUPLENTE_RSG',
    'TESOUREIRO',
    'SUPLENTE_TESOUREIRO',
    'SECRETARIO',
    'SUPLENTE_SECRETARIO'
  ] 

  //toppings = new FormControl();

  //toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];

  constructor(
    private pessoaService: PessoaService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    const codigoPessoa = this.route.snapshot.params['codigo']
    if(codigoPessoa) {
      this.carregarPessoa(codigoPessoa)
    }
  }

  carregarPessoa(codigo: number) {
    //this.editando = true
    this.pessoaService.findById(codigo).subscribe(
      response => {
        this.pessoa = response
        console.log(this.pessoa)
        this.pessoaForm.patchValue(this.pessoa)
        //this.atualizarTituloEdicao()
      }
    )
  }

  pessoaForm = this.formBuilder.group({
    nome: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],    
    telefone: ['', [Validators.required]],
    email: ['', [Validators.required]],
    //encargo: ['', [Validators.required]]
    // encargos: this.formBuilder.array([
    //   this.formBuilder.group({
    //     codigo: this.formBuilder.control[''],
    //     encargo: this.formBuilder.control['']
    //   })
    // ]),
    encargos: this.formBuilder.array([
      this.formBuilder.control('')
    ]),
    // encargos: this.formBuilder.array([
    //   this.formBuilder.group({
    //     codigo: this.formBuilder.control[''],
    //     nome: this.formBuilder.control['']
    //   })
    // ]),
  })
  encargos = this.pessoaForm.get('encargos') as FormArray;

  addEncargo() {
    this.encargos.push(this.formBuilder.control(''))
  }

  submit() {
    console.log(this.pessoaForm.value)
  }

}
