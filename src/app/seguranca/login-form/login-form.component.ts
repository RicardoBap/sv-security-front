import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';

import { CredenciaisDTO } from 'src/app/seguranca/models/credenciais.dto';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  creds: CredenciaisDTO = {
    email: "",
    senha: ""
  }

  jwtPayload: any;

  nome: string;

  bLoading: boolean = false;

  constructor(
    private auth: AuthService,
    private router: Router,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  login() {    
    //console.log('cred', this.creds)
    this.bLoading = true; //<------ ATIVA PROGRESS BAR
    this.auth.authenticate(this.creds).subscribe(
      response => {        
        this.jwtPayload = this.auth.successfullLogin(response.headers.get('Authorization')) 
        this.nome = this.jwtPayload; // <-- Possivel mudar o nome da variavel jwtPayload para nome
        //console.log(response.headers.get('Authorization'));  
        this.bLoading = false; //<------ DESATIVA PROGRESS BAR
        this.router.navigate(['/lancamentos']);         
      },        
      error => {
        if(error.status == 0) {
          this.snackBar.open('Não conseguiu conectar no servidor', '', // Status = 0
          { duration: 1000, panelClass: ['snack_error'] })
          this.bLoading = false; //<------ DESATIVA PROGRESS BAR
        }
        // this.snackBar.open(error.error.message, error.status, // Forbidden - 403
        //   { duration: 3000, panelClass: ['snack_error'] })
      }
      )     
  }

  // refresh_token() {    
  //   console.log('refreshToken')
  //   this.auth.refreshToken()
  //     .subscribe(response => {        
  //       this.jwtPayload = this.auth.successfullLogin(response.headers.get('Authorization')) 
  //       this.jwtPayload = this.jwtPayload; // <-- Possivel mudar o nome da variavel jwtPayload para nome
  //       //console.log(response.headers.get('Authorization'));  
  //       this.router.navigate(['/lancamentos']);         
  //     },        
  //     error => {}
  //     )     
  // }

}
