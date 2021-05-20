import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/seguranca/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements  OnInit {

  nome: string;

  @ViewChild('sidenav') sidenav: MatSidenav;

  exibindoMenu = true;

  reason = '';

  jwtPayload: any;

  //nome: string;

  constructor(
    public auth: AuthService,
    private router: Router) {
  }

  ngOnInit() {
    this.nome = this.auth.getNome();
  }
 

  close(reason: string) {
    this.reason = reason;
    this.sidenav.close();
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']); 
  }

  refreshToken() {    
    console.log('refreshToken')
    this.auth.refreshToken()
      .subscribe(response => {
        //console.log(response.headers.get('Authorization'))    
        this.jwtPayload = this.auth. successfullRefreshToken(response.headers.get('Authorization')) 
        this.jwtPayload = this.jwtPayload; // <-- Possivel mudar o nome da variavel jwtPayload para nome
        //console.log(response.headers.get('Authorization'));
        console.log('fim')  
        //this.router.navigate(['/lancamentos']);         
      },        
      error => {}
      )      
  }
  

}