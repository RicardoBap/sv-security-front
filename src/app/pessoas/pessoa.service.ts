import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { PessoaResumoModel } from '../core/model/pessoaResumoModel.model';


@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  readonly pessoasUrl = "http://localhost:8080/pessoas"

  constructor(private http: HttpClient) { }

  // IMPLEMENTADO PARA CADASTRO DE LANCAMENTO ONDE REQUER PESSOA
  carregarPessoas(): Observable<PessoaResumoModel[]> {
    return this.http.get<PessoaResumoModel[]>(`${this.pessoasUrl}/resumo`)
  }

  pesquisar(): Observable<any> {
    return this.http.get(`${this.pessoasUrl}`)
  }

  


}
