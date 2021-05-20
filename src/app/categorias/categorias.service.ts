import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Categoria } from '../core/model/categoria.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  categoriasUrl = 'http://localhost:8080/categorias'

  constructor(private http: HttpClient) { }

  carregarCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(`${this.categoriasUrl}`)
  }


}
