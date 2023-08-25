import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Singleton } from 'src/app/library/Singleton';
import { CabezeraMaestroService } from 'src/app/services/cabezera-maestro.service';
import { MesaService } from 'src/app/services/mesa.service';
import { PlatoService } from 'src/app/services/plato.service';
import { ProductoService } from 'src/app/services/producto.service';
import { Alert } from 'src/app/shared/functions/alerts';
import { MainFunction } from 'src/app/shared/functions/mainFunction';
import { VariablesGlobales } from 'src/app/shared/functions/variablesGlobales';

@Component({
  selector: 'app-main-admin',
  templateUrl: './main-admin.component.html',
  styleUrls: ['./main-admin.component.scss']
})
export class MainAdminComponent implements OnInit {

  constructor(public mainFunction:MainFunction, private router:Router, private variableGlobales:VariablesGlobales, private cabezeraMaestroService:CabezeraMaestroService,
    private singleton:Singleton, private platosService:PlatoService, private mesaService:MesaService, private productoService:ProductoService,
    private alert:Alert) { }

  async ngOnInit(): Promise<void> {
    this.variableGlobales.resetAllVariables();
    await this.getDataUser();
    await this.getFiltros();

  }

  async getDataUser(){
    if(localStorage.getItem('userData') === null){
      this.router.navigate(['/']);
      return;
    }
    let userDataStorage = localStorage.getItem('userData') || "";
    this.mainFunction.usuarioLogueado = JSON.parse(userDataStorage);
  }

  async getFiltros(){
    await this.cabezeraMaestroService.buscar(this.singleton.vCategoria).then(resolve => {
      if(resolve.status === 200){
        this.variableGlobales.arrayCategoria = resolve.body.message.detalleMaestros;
      }
    });
    await this.cabezeraMaestroService.buscar(this.singleton.vCategoriaProducto).then(resolve => {
      if(resolve.status === 200){
        this.variableGlobales.arrayCategoriaProducto = resolve.body.message.detalleMaestros;
      }
    });
    await this.cabezeraMaestroService.buscar(this.singleton.vMedidas).then(resolve => {
      if(resolve.status === 200){
        this.variableGlobales.arrayUnidad = resolve.body.message.detalleMaestros;
      }
    });
    await this.cabezeraMaestroService.buscar(this.singleton.vFiltroOrden).then(resolve => {
      if(resolve.status === 200){
        this.variableGlobales.arrayOrden = resolve.body.message.detalleMaestros;
      }
    });
    await this.cabezeraMaestroService.buscar(this.singleton.vFiltroPrecio).then(resolve => {
      if(resolve.status === 200){
        this.variableGlobales.arrayPrecio = resolve.body.message.detalleMaestros;
      }
    });
    await this.platosService.buscarAll_Inner().then(resolve => {
      if(resolve.status === 200){
        this.variableGlobales.platosArray = resolve.body.message;
      }
    });
    await this.productoService.buscarAll_Inner().then(resolve => {
      if(resolve.status === 200){
        this.variableGlobales.productosArray = resolve.body.message;
        this.variableGlobales.productosArray.forEach(d => this.variableGlobales.productosArrayFilter.push(Object.assign({},d)));
      }
    });
    await this.mesaService.buscarAll().then(resolve => {
      if(resolve.status === 200){
        this.variableGlobales.mesasArray = resolve.body.message;
      }
    });
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
