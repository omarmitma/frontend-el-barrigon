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
    await this.getDataUser();
    await this.getFiltros();
    this.returnCartaPlatosWeb();
    this.getDataFuncionCliente();
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

    this.innerPlatoCarrito();

  }

  returnCartaPlatosWeb(){
    this.variableGlobales.platosArray.forEach(data => {
      let cartaNow = this.variableGlobales.cartaReturn.filter(d => d.idCategoria === data.idCategoria);
      let cartaAdd:CartaPlatosWeb = new CartaPlatosWeb();
      cartaAdd.idCategoria = data.idCategoria;
      cartaAdd.nomCategoria = data.nomCategoria;
      cartaAdd.platos.push(data);
      if(cartaNow.length > 0)cartaNow[0].platos.push(data);
      else this.variableGlobales.cartaReturn.push(cartaAdd);
    
    });
  }

  getDataFuncionCliente(){
    let function2 = this.variableGlobales.arrayClienteFunciones.filter(d => d.idFuncion === 2);
    let function3 = this.variableGlobales.arrayClienteFunciones.filter(d => d.idFuncion === 3);
    let function4 = this.variableGlobales.arrayClienteFunciones.filter(d => d.idFuncion === 4);
    this.variableGlobales.tipoPago = function2.length > 0 ? function2[0].descripcion : "";
    this.variableGlobales.cantidadPersonas = function3.length > 0 ? function3[0].descripcion : "";
    this.variableGlobales.mesa = function4.length > 0 ? function4[0].descripcion : "";
    this.variableGlobales.idMesa = function4.length > 0 ? function4[0].campo1Int : 0;
  }

  innerPlatoCarrito(){
    this.variableGlobales.carrito.detalleCarritos.forEach(d => {
      let platoNow = this.variableGlobales.platosArray.filter(c => c.idPlato === d.idPlato);
      if(platoNow.length > 0 && d.flagPedido === 0){
        platoNow[0].idDetalleCarrito = d.idDetalleCarrito;
        platoNow[0].observacion = d.comentario;
        platoNow[0].precioCarrito = d.precio;
        platoNow[0].tiempoEspera = d.tiempoEspera;
        platoNow[0].cantidad = d.cantidad;
        platoNow[0].flagInShoppingCar = true;
        platoNow[0].detallePlatos.forEach(dp => {
          let detaCarritoPersonNow = d.detalleCarritoPersonalizados.filter(dcp => dcp.idProducto === dp.idProducto);
          if(detaCarritoPersonNow.length > 0){
            dp.idMedida = detaCarritoPersonNow[0].idMedida;
            dp.cantidad = detaCarritoPersonNow[0].cantidad;
            dp.flagSelect = detaCarritoPersonNow[0].flagRequerido === 1 ? true : false;
            dp.abrMedida = detaCarritoPersonNow[0].abrMedida;
            dp.nomMedida = detaCarritoPersonNow[0].nomMedida;
          }
        });
      }
    });
  }
}
