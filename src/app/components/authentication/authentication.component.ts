import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { UsuarioLogin } from 'src/app/entitys/usuarioLogin';
import { LoginService } from 'src/app/services/login.service';
import { Alert } from 'src/app/shared/functions/alerts';
import { MainFunction } from 'src/app/shared/functions/mainFunction';
@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit {

  tipoForm:number = 1;
  usuario:UsuarioLogin = new UsuarioLogin();

  constructor(private alert:Alert, private loginService:LoginService, private router:Router, private mainFunction:MainFunction) { }
  
  ngOnInit(): void {
  }

  changeTipeForm(tipo:number){
    
    let bg = document.querySelector('.background');
    bg?.classList.add('background-right');

    window.setTimeout(() => {
      this.tipoForm = tipo;
    },800)
    let fr = document.querySelector('.form');
    fr?.classList.add('form-left');
    
  }


  //Al presionar enter loguearse
  pressKey(e:KeyboardEvent){
    if (e.keyCode === 13 && !e.shiftKey) {
      this.logeo();
    }
  }

  async logeo(){
    if(this.usuario.usuario === '' || this.usuario.clave ==='' ){
      this.alert.alertError("Campos Incompletos","Necesario llenar todos los campos");
      return;
    }
    
    this.mainFunction.loadingMain = true;
    //Logeo
    await this.loginService.loginUsuario(this.usuario).then(data=>{
      if(data.status === 200){
        this.mainFunction.addSessionToken(data.body.user);
        if(data.body.user.clientes.length > 0)this.router.navigate(['/main']);
        else if(data.body.user.empleados.length > 0)this.router.navigate(['/admin/mesas']);
        else this.router.navigate(['/main']);
      }
    });
  }
}
