import { Injectable } from '@angular/core';
import { Carrito } from 'src/app/entitys/carrito';
import { ClienteFunciones } from 'src/app/entitys/clienteFunciones';
import { DetalleMaestro } from 'src/app/entitys/detalleMaestro';
import { Mesa } from 'src/app/entitys/mesa';
import { CartaPlatosWeb } from 'src/app/entitys/otros/cartaPlatosWeb';
import { Platos } from 'src/app/entitys/platos';
import { Producto } from 'src/app/entitys/producto';
@Injectable()
export class VariablesGlobales {
    
    arrayOrden:DetalleMaestro[] = [];
    arrayCategoria:DetalleMaestro[] = [];
    arrayCategoriaProducto:DetalleMaestro[] = [];
    arrayUnidad:DetalleMaestro[] = [];
    arrayPrecio:DetalleMaestro[] = [];
    platosArray:Platos[] = [];
    productosArray:Producto[] = [];
    cartaReturn:CartaPlatosWeb[] = [];
    arrayClienteFunciones:ClienteFunciones[] = [];

    platosArrayFilter:Platos[] = [];
    productosArrayFilter:Producto[] = [];
    cartaReturnFilter:CartaPlatosWeb[] = [];

    // itemInShoppingCart:Platos[] = [];

    mesasArray:Mesa[] = [];

    carrito:Carrito = new Carrito();

    cantidadPersonas:string = "";
    idMesa:number = 0;
    mesa:string = "";
    tipoPago:string  = "";
    
    constructor(){}

    returnCartaPlatosWeb(){
        this.cartaReturn = [];
        this.cartaReturnFilter = [];
        this.platosArray.forEach(data => {
          let cartaNow = this.cartaReturn.filter(d => d.idCategoria === data.idCategoria);
          let cartaAdd:CartaPlatosWeb = new CartaPlatosWeb();
          cartaAdd.idCategoria = data.idCategoria;
          cartaAdd.nomCategoria = data.nomCategoria;
          cartaAdd.platos.push(data);
          if(cartaNow.length > 0)cartaNow[0].platos.push(data);
          else this.cartaReturn.push(cartaAdd);
        });

        this.cartaReturn.forEach(deta => {
            let addCartaPlatosWeb = Object.assign({},deta);
            addCartaPlatosWeb.platos = [];
            deta.platos.forEach(p => addCartaPlatosWeb.platos.push(Object.assign({},p)));
            this.cartaReturnFilter.push(Object.assign({},addCartaPlatosWeb));
        });
    }

    getDataFuncionCliente(){
        let function2 = this.arrayClienteFunciones.filter(d => d.idFuncion === 2);
        let function3 = this.arrayClienteFunciones.filter(d => d.idFuncion === 3);
        let function4 = this.arrayClienteFunciones.filter(d => d.idFuncion === 4);
        this.tipoPago = function2.length > 0 ? function2[0].descripcion : "";
        this.cantidadPersonas = function3.length > 0 ? function3[0].descripcion : "";
        this.mesa = function4.length > 0 ? function4[0].descripcion : "";
        this.idMesa = function4.length > 0 ? function4[0].campo1Int : 0;
    }

    innerPlatoCarrito(){
        this.carrito.detalleCarritos.forEach(d => {
            let platoNow = this.platosArray.filter(c => c.idPlato === d.idPlato);
            if(platoNow.length > 0 && d.flagPedido === 0){
                platoNow[0].idDetalleCarrito = d.idDetalleCarrito;
                platoNow[0].observacion = d.comentario;
                platoNow[0].precioCarrito = d.precio > 0 ? d.precio : platoNow[0].precioCarrito;
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

    resetAllVariables(){
        this.arrayOrden = [];
        this.arrayCategoria = [];
        this.arrayCategoriaProducto = [];
        this.arrayUnidad = [];
        this.arrayPrecio = [];
        this.platosArray = [];
        this.productosArray = [];
        this.cartaReturn = [];
        this.arrayClienteFunciones = [];
        this.platosArrayFilter = [];
        this.productosArrayFilter = [];
        this.cartaReturnFilter = [];


        this.mesasArray = [];

        this.carrito = new Carrito();
        this.cantidadPersonas = "";
        this.idMesa = 0;
        this.mesa = "";
        this.tipoPago  = "";
    }
}