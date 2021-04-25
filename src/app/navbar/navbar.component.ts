import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent  {

  @ViewChild('sidenav') sidenav: MatSidenav;

  exibindoMenu = true;

  reason = '';

  close(reason: string) {
    this.reason = reason;
    this.sidenav.close();
  }

  

  

}