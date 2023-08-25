import { Component, OnInit } from '@angular/core';
import { MainFunction } from '../../functions/mainFunction';
import { Router } from '@angular/router';
import { Alert } from '../../functions/alerts';
import { VariablesGlobales } from '../../functions/variablesGlobales';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private alert:Alert, public mainFunction:MainFunction, public variableGlobales:VariablesGlobales, private router:Router) { }

  ngOnInit(): void {
  }

  
  activeMenuUser:boolean = false;
  openMenuUser(){
    this.activeMenuIdioma = false;
    if(this.activeMenuUser) this.activeMenuUser = false;
    else this.activeMenuUser = true;
  }

  activeMenuIdioma:boolean = false;
  openMenuIdioma(){
    this.activeMenuUser = false;
    if(this.activeMenuIdioma) this.activeMenuIdioma = false;
    else this.activeMenuIdioma = true;
  }

  logOut(){
    this.alert.alertQuestion("¿Seguro de cerrar sesion?","").then(result=>{
      if(result.isConfirmed){
        localStorage.removeItem('userData');
        this.router.navigate(['']);
      }
    });
  }
}
