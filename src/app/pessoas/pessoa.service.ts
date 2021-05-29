import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Pessoa } from '../core/model/pessoa.model';

import { PessoaResumoModel } from '../core/model/pessoaResumoModel.model';


@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  readonly pessoasUrl = "http://localhost:8080/pessoas"

  private pessoaSubject$: BehaviorSubject<Pessoa[]> = new BehaviorSubject<Pessoa[]>(null);
  private loaded: boolean = false

  constructor(private http: HttpClient) { }

  // IMPLEMENTADO PARA CADASTRO DE LANCAMENTO ONDE REQUER PESSOA
  carregarPessoas(): Observable<PessoaResumoModel[]> {
    return this.http.get<PessoaResumoModel[]>(`${this.pessoasUrl}/resumo`)
  }

  pesquisar(): Observable<Pessoa[]> {
    return this.http.get<Pessoa[]>(`${this.pessoasUrl}`)
  }

  findById(codigo: number): Observable<Pessoa> {
    return this.http.get<Pessoa>(`${this.pessoasUrl}/${codigo}`)
  }

  mudarStatus(codigo: number, ativo: boolean): Observable<any> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json')
    console.log("!!!" + ativo)
    return this.http.put(`${this.pessoasUrl}/${codigo}/ativo`, `${ativo}`, { headers }) 
  }

}


// pesquisar(): Observable<Pessoa[]> {    
//   if(!this.loaded) {
//     this.http.get<Pessoa[]>(`${this.pessoasUrl}`)
//       .pipe(tap((pessoa) => console.log(pessoa)) )
//       .subscribe(this.pessoaSubject$)
//     this.loaded = true
//   }
//   return this.pessoaSubject$.asObservable();
// }