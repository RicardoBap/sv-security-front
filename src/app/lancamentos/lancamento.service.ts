import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';

import * as moment from 'moment';
import { Observable } from 'rxjs';
import { Lancamento } from '../core/model/lancamento.model';


export interface LancamentoFiltro {
  descricao: string;
  dataVencimentoInicio: Date
  dataVencimentoFim: Date
  page: number
  size: number
}

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {

  lancamentosUrl = 'http://localhost:8080/lancamentos'

  constructor(private http: HttpClient) { }

  pesquisar(filtro: LancamentoFiltro): Observable<any> {

    let params = new HttpParams({
      fromObject: {
        page: filtro.page.toString(),        //params = params.set('page', filtro.pagina.toString())
        size: filtro.size.toString()         //params = params.set('size', filtro.itensPorPagina.toString())
      }
    })

    if(filtro.descricao) {
      params = params.append('descricao', filtro.descricao)
    }
    if(filtro.dataVencimentoInicio) {
      params = params.append('dataVencimentoDe', 
        moment(filtro.dataVencimentoInicio).format('YYYY-MM-DD'))
    }
    if(filtro.dataVencimentoFim) {
      params = params.append('dataVencimentoAte', 
        moment(filtro.dataVencimentoFim).format('YYYY-MM-DD'))
    }

    return this.http.get(`${this.lancamentosUrl}/resumo`, { params })
  }

  adicionar(lancamento: Lancamento): Observable<any> {
    return this.http.post(`${this.lancamentosUrl}`, lancamento,      
      { observe: 'response', responseType: 'text' }) //<--- necessário para o snackBar de error interceptor
  }

  buscarPeloCodigo(codigo: number): Observable<Lancamento> {
    return this.http.get<Lancamento>(`${this.lancamentosUrl}/${codigo}`)
  }

  atualizar(lancamento: Lancamento, codigo: number): Observable<any> {
    return this.http.put(`${this.lancamentosUrl}/${codigo}`, lancamento,
    { observe: 'response', responseType: 'text' }) //<--- necessário para o snackBar de error interceptor
  }

  excluir(codigo: Lancamento): Observable<any> {
    return this.http.delete(`${this.lancamentosUrl}/${codigo}`)
  }
     

}



// buscarPeloCodigo(codigo: number): Promise<Lancamento> {
  //   const headers = new HttpHeaders()
  //     .append('Authorization', 'Basic YWRtaW46YWRtaW4=')

  //   return this.http.get<Lancamento>(`${this.lancamentosUrl}/${codigo}`, { headers } )
  //     .toPromise()
  //     .then( response => {
  //       const lancamento = response //as Lancamento
  //       //this.converterStringParaData(lancamento)
  //       return lancamento
  //     })
  // }

  // atualizar(lancamento: Lancamento, codigo: number): Promise<Lancamento> {
  //   //const headers = new HttpHeaders()
  //     //.append('Authorization', 'Basic YWRtaW46YWRtaW4=')
  //     //.append('Content-type', 'application/json')

  //   const body = JSON.stringify(lancamento);

  //   return this.http.put<Lancamento>(`${this.lancamentosUrl}/${codigo}`, lancamento) // body , { headers }
  //     .toPromise()
  //     .then(response => response)
  // }

  // private converterStringParaDatas(lancamentos: Lancamento[]) {
  //   for (const lancamento of lancamentos) {
  //     lancamento.dataVencimento = moment(lancamento.dataVencimento,
  //       'YYYY-MM-DD').toDate();

  //   if (lancamento.dataPagamento) {
  //     lancamento.dataPagamento = moment(lancamento.dataPagamento,
  //       'YYYY-MM-DD').toDate();
  //   }
  //   }
  // }




  // private lancamentoSubject$: BehaviorSubject<Lancamento[]> = new BehaviorSubject<Lancamento[]>(null)
  // private loaded: boolean = false;

  // if(!this.loaded) {
  //   this.http.get<any>(`${this.lancamentosUrl}/resumo`, { params })
  //   .pipe(tap((lancamentos) => console.log(lancamentos)))
  //     .subscribe(this.lancamentoSubject$)
  //   this.loaded = true;
  // }
  // return this.lancamentoSubject$.asObservable();