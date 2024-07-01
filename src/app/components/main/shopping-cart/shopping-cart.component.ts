import { Component, OnInit } from '@angular/core';
import { DetalleCarrito } from 'src/app/entitys/detalleCarrito';
import { Pedido } from 'src/app/entitys/pedido';
import { CarritoService } from 'src/app/services/carrito.service';
import { DetalleCarritoService } from 'src/app/services/detalle-carrito.service';
import { PedidoService } from 'src/app/services/pedido.service';
import { Alert } from 'src/app/shared/functions/alerts';
import { MainFunction } from 'src/app/shared/functions/mainFunction';
import { VariablesGlobales } from 'src/app/shared/functions/variablesGlobales';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit{

  constructor(public variablesGlobales:VariablesGlobales,private alert:Alert, private carritoService:CarritoService, private detalleCarritoService:DetalleCarritoService,
    private mainFunction:MainFunction, private pedidoService:PedidoService){}

  async ngOnInit(): Promise<void> {
    await this.getCarrito();
  }

  deleteItem(item:DetalleCarrito){
    this.alert.alertConfirm("¿Desea eliminar este Plato?","").then(async(resolve) => {
      if(resolve.isConfirmed){
        await this.detalleCarritoService.eliminar(item.idDetalleCarrito).then();
        await this.getCarrito();
      }
    });
  }

  async changeQuantity(item:DetalleCarrito,tipo:number){
    if(tipo === 1)item.cantidad ++;
    else if(tipo === 2 && item.cantidad > 1)item.cantidad --;

    await this.detalleCarritoService.actualizar(item).then();
  }

  async getCarrito(){
    await this.carritoService.buscar_ByCliente(this.mainFunction.usuarioLogueado.clientes[0].idCliente).then(resolve => {
      if(resolve.status === 200 && resolve.body.response){
        this.variablesGlobales.carrito = resolve.body.message;
      }
    });
  }

  async confirmPedido(){
    this.alert.alertConfirm("¿Seguro de confirmar este pedido?","No se podra cancelar el pedido").then(async(resolve) => {
      if(resolve.isConfirmed){
        let pedido:Pedido = new Pedido();
        pedido.idCliente = this.mainFunction.usuarioLogueado.clientes[0].idCliente;
        await this.pedidoService.confirmPedido(pedido).then();
        await this.getCarrito();
        this.alert.alertSucces("Confirmado existosamente");
      }
    });
  }
}
