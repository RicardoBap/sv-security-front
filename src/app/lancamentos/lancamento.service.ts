import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {

  lancamentosUrl = 'http://localhost:8080/lancamentos'

  constructor(private http: HttpClient) { }

  pesquisar(): Promise<any> {
    // const headers = new HttpHeaders();
    // headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');

    return this.http.get(`${this.lancamentosUrl}`)
      .toPromise()
      .then(response => {
        console.log(response)
      })
    }



}
