import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

import { Observable } from 'rxjs';
import { CredenciaisDTO } from './models/credenciais.dto';
import { LocalUser } from './models/local_user';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  oauthTokenUrl = 'http://localhost:8080';

  jwtHelper: JwtHelperService = new JwtHelperService();
  jwtPayload: any;
  nome: any; 

  constructor(
    public http: HttpClient,
    public storage: StorageService
  ) { }

  public getNome() {
    return this.nome;
  }
 
  authenticate(creds: CredenciaisDTO): Observable<any> {
    return this.http.post(`${this.oauthTokenUrl}/login`, creds, 
      { observe: 'response', responseType: 'text' })            
  } 

  refreshToken(): Observable<any> {
    console.log('chamou')  
    return this.http.post(`${this.oauthTokenUrl}/auth/refresh_token`, {},
      { observe: 'response', responseType: 'text' })            
  }

  // temPermissao(permissao: string) {
  //   return console.log(this.jwtPayload && this.jwtPayload.roles.authorities.include(permissao));
  // }

  isAccessTokenInvalido() {
    const token = localStorage.getItem('localUser');
    console.log('teste=> ' + !token || this.jwtHelper.isTokenExpired(token))
    return  !token || this.jwtHelper.isTokenExpired(token);
  }

  successfullLogin(authorizationValue: string): Observable<string> {
    let tok = authorizationValue.substring(7);
    this.nome = this.extrairNomeUser(tok) // <-- Retira o nome do token
    let user: LocalUser = {
      token: tok,
      email: this.jwtHelper.decodeToken(tok).sub
    }
    //this.storage.setLocalUser(user);
    this.armazenarToken(user)
    return this.nome;
  }

  successfullRefreshToken(refreshTokenValue: string): Observable<string> {
    let tok = refreshTokenValue.substring(7);
    //this.armazenarToken(tok) //<---------
    this.nome = this.extrairNomeUser(tok) // <-- Retira o nome do token
    let user: LocalUser = {
      token: tok,
      email: this.jwtHelper.decodeToken(tok).sub
    }
    //this.storage.setLocalUser(user);
    this.armazenarToken(user)
    return this.nome;
  }
  
  armazenarToken(user: LocalUser) { // <------------
    //this.jwtHelper.decodeToken(token).sub
    this.storage.setLocalUser(user); //<--OK
  }

  // armazenarToken2(token: string) {
  //   this.jwtPayload = this.jwtHelper.decodeToken(token)
  //   localStorage.setItem('token', token);
  // }

  extrairNomeUser(token: string): Observable<any> {
    return this.nome = this.jwtHelper.decodeToken(token).nome
  }

  logout() {
    this.storage.setLocalUser(null);
  }

   


}
