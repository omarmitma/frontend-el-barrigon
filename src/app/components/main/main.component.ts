import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClienteFunciones } from 'src/app/entitys/clienteFunciones';
import { CartaPlatosWeb } from 'src/app/entitys/otros/cartaPlatosWeb';
import { Singleton } from 'src/app/library/Singleton';
import { CabezeraMaestroService } from 'src/app/services/cabezera-maestro.service';
import { CarritoService } from 'src/app/services/carrito.service';
import { ClienteFuncionesService } from 'src/app/services/cliente-funciones.service';
import { MesaService } from 'src/app/services/mesa.service';
import { PlatoService } from 'src/app/services/plato.service';
import { MainFunction } from 'src/app/shared/functions/mainFunction';
import { VariablesGlobales } from 'src/app/shared/functions/variablesGlobales';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(public mainFunction:MainFunction, private router:Router, private variableGlobales:VariablesGlobales, private cabezeraMaestroService:CabezeraMaestroService,
    private singleton:Singleton, private platosService:PlatoService, private mesaService:MesaService, private clienteFuncionesService:ClienteFuncionesService,
    private carritoService:CarritoService) { }

  async ngOnInit(): Promise<void> {
    this.variableGlobales.resetAllVariables();
    await this.getDataUser();
    await this.getFiltros();
    this.variableGlobales.returnCartaPlatosWeb();
    this.variableGlobales.getDataFuncionCliente();
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
        this.variableGlobales.platosArray.forEach(pl => {
          pl.cantidad = 1;
          pl.detallePlatos.forEach(d => {
            d.flagSelect = true;
          });
        });

        this.variableGlobales.platosArray.forEach(d => this.variableGlobales.platosArrayFilter.push(Object.assign({},d)));
      }
    });
    await this.mesaService.buscarAll().then(resolve => {
      if(resolve.status === 200){
        this.variableGlobales.mesasArray = resolve.body.message;
      }
    });
    await this.clienteFuncionesService.buscar_ByCliente(this.mainFunction.usuarioLogueado.clientes[0].idCliente).then(resolve => {
      if(resolve.status === 200){
        this.variableGlobales.arrayClienteFunciones = resolve.body.message;
      }
    });

    await this.carritoService.buscar_ByCliente(this.mainFunction.usuarioLogueado.clientes[0].idCliente).then(resolve => {
      if(resolve.status === 200 && resolve.body.response){
        this.variableGlobales.carrito = resolve.body.message;
      }
    });

    this.variableGlobales.innerPlatoCarrito();

  }

}
