import { Component, OnInit } from '@angular/core';
import { Alert } from 'src/app/shared/functions/alerts';
import { MainFunction } from 'src/app/shared/functions/mainFunction';
import { VariablesGlobales } from 'src/app/shared/functions/variablesGlobales';
import { Platos } from 'src/app/entitys/platos';
import { MesaFuncionesService } from 'src/app/services/mesa-funciones.service';
import { MesaFunciones } from 'src/app/entitys/mesaFunciones';
import { Mesa } from 'src/app/entitys/mesa';
import { ClienteFuncionesService } from 'src/app/services/cliente-funciones.service';
import { ClienteFunciones } from 'src/app/entitys/clienteFunciones';
import { CarritoService } from 'src/app/services/carrito.service';
import { Carrito } from 'src/app/entitys/carrito';
import { DetalleCarrito } from 'src/app/entitys/detalleCarrito';
import { DetalleCarritoPersonalizado } from 'src/app/entitys/detalleCarritoPersonalizado';
import { DetalleCarritoService } from 'src/app/services/detalle-carrito.service';
import { FilterItems } from 'src/app/shared/functions/filterItems';
import { PlatoService } from 'src/app/services/plato.service';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.scss']
})
export class CatalogoComponent implements OnInit {

  platoChosen:Platos = new Platos();
  typeCrud:string = "";

  constructor(public variableGlobales:VariablesGlobales, private mainFunction:MainFunction, private alert:Alert,private mesaFuncionesService:MesaFuncionesService,
    private clienteFuncionesService:ClienteFuncionesService, private carritoService:CarritoService, private detalleCarritoService:DetalleCarritoService,
    private filterItems:FilterItems, private platosService:PlatoService) { }

  async ngOnInit(): Promise<void> {
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
    this.variableGlobales.innerPlatoCarrito();

    this.variableGlobales.returnCartaPlatosWeb();
  }

  async addItem(data:Platos){

    let validate:boolean = this.validateRequired();
    if(!validate)return;

    data.flagInShoppingCar = true;

    if(this.variableGlobales.carrito.idCliente > 0){
      let addDetalleCarrito:DetalleCarrito = new DetalleCarrito();
      addDetalleCarrito.idPlato	= data.idPlato;
      addDetalleCarrito.tiempoEspera = data.tiempoEspera;
      addDetalleCarrito.precio = data.precio;
      addDetalleCarrito.cantidad = 1;
      addDetalleCarrito.idCarrito = this.variableGlobales.carrito.idCarrito;
      addDetalleCarrito.comentario = "";
      data.detallePlatos.forEach(detaPlato => {
        let addDetalleCarritoPersonalizado:DetalleCarritoPersonalizado = new DetalleCarritoPersonalizado();
        addDetalleCarritoPersonalizado.idProducto = detaPlato.idProducto;
        addDetalleCarritoPersonalizado.idMedida = detaPlato.idMedida;
        addDetalleCarritoPersonalizado.cantidad = detaPlato.cantidad;
        addDetalleCarritoPersonalizado.flagRequerido = detaPlato.flagSelect === true ? 1 : 0;

        addDetalleCarrito.detalleCarritoPersonalizados.push(Object.assign({},addDetalleCarritoPersonalizado));
      });
      await this.detalleCarritoService.registro(addDetalleCarrito).then();
    }else{
      let addCarrito:Carrito = new Carrito();
      addCarrito.idMesa = this.variableGlobales.idMesa;
      addCarrito.idCliente = this.mainFunction.usuarioLogueado.clientes[0].idCliente;
      addCarrito.cantidadPersonas = Number(this.variableGlobales.cantidadPersonas);
      addCarrito.tipoPago = 1;
      addCarrito.totalPago = data.precio;

      let addDetalleCarrito:DetalleCarrito = new DetalleCarrito();
      addDetalleCarrito.idPlato	= data.idPlato;
      addDetalleCarrito.tiempoEspera = data.tiempoEspera;
      addDetalleCarrito.precio = data.precio;
      addDetalleCarrito.cantidad = 1;
      addDetalleCarrito.comentario = "";
      addDetalleCarrito.flagPedido = 0;
      data.detallePlatos.forEach(detaPlato => {
        let addDetalleCarritoPersonalizado:DetalleCarritoPersonalizado = new DetalleCarritoPersonalizado();
        addDetalleCarritoPersonalizado.idProducto = detaPlato.idProducto;
        addDetalleCarritoPersonalizado.idMedida = detaPlato.idMedida;
        addDetalleCarritoPersonalizado.cantidad = detaPlato.cantidad;
        addDetalleCarritoPersonalizado.flagRequerido = detaPlato.flagSelect === true ? 1 : 0;

        addDetalleCarrito.detalleCarritoPersonalizados.push(Object.assign({},addDetalleCarritoPersonalizado));
      });
      addCarrito.detalleCarritos.push(Object.assign({},addDetalleCarrito));
      await this.carritoService.registro(addCarrito).then();
    }

    await this.getCarrito();
  }

  deleteItem(data:Platos){
    this.alert.alertConfirm("¿Desea eliminar este Plato?","").then(async(resolve) => {
      if(resolve.isConfirmed){
        await this.detalleCarritoService.eliminar(data.idDetalleCarrito).then();
        await this.getCarrito();
      }
    });
  }

  detailItem(data:Platos){
    this.typeCrud = "Ver";
    this.platoChosen = data;
    this.mainFunction.openModalSearch("wrapModalDetallarPlato");
  }

  llamarMesero(){
    let validate:boolean = this.validateRequired();
    if(!validate)return;
    
    this.alert.alertConfirm("¿Desea llamar mesero?","").then(async(resolve) => {
      if(resolve.isConfirmed){
        let addMesaFunciones:MesaFunciones = new MesaFunciones();
        addMesaFunciones.idFuncion = 1;
        addMesaFunciones.idMesa = this.variableGlobales.idMesa;
        addMesaFunciones.descripcion = "Llamando Mesero";
        addMesaFunciones.horSolicitada = addMesaFunciones.horRegistro;
        await this.mesaFuncionesService.registrar(addMesaFunciones).then(resolve => {
          if(resolve.status === 200){
            this.alert.alertSucces("El mesero vendra pronto");
          }
        });

        let addClienteFunciones:ClienteFunciones = new ClienteFunciones();
        addClienteFunciones.idCliente = this.mainFunction.usuarioLogueado.clientes[0].idCliente;
        addClienteFunciones.idFuncion = 1;
        addClienteFunciones.campo1Int = 0;
        addClienteFunciones.descripcion = "Llamando Mesero";
    
        await this.clienteFuncionesService.registro(addClienteFunciones).then();
      }
    });
  }

  changeTipoPago(){
    let validate:boolean = this.validateRequired();
    if(!validate)return;
  }

  changeQuantityPersonas(){
    let validate:boolean = this.validateRequired();
    if(!validate)return;

    this.alert.alertGetValue("Ingrese cantidad de Personas").then(async(resolve) => {
      if(resolve.isConfirmed){

        let addMesaFunciones:MesaFunciones = new MesaFunciones();
        addMesaFunciones.idFuncion = 3;
        addMesaFunciones.idMesa = this.variableGlobales.idMesa;
        addMesaFunciones.descripcion = resolve.value;
        addMesaFunciones.horSolicitada = addMesaFunciones.horRegistro;
        await this.mesaFuncionesService.registrar(addMesaFunciones).then();

        let addClienteFunciones:ClienteFunciones = new ClienteFunciones();
        addClienteFunciones.idCliente = this.mainFunction.usuarioLogueado.clientes[0].idCliente;
        addClienteFunciones.idFuncion = 3;
        addClienteFunciones.campo1Int = 0;
        addClienteFunciones.descripcion = resolve.value;
    
        await this.clienteFuncionesService.registro(addClienteFunciones).then();

        this.variableGlobales.cantidadPersonas = resolve.value;
      }
    });
  }

  chosenMesa(){
    this.typeCrud = "BUSCAR";
    this.mainFunction.openModalSearch("wrapModalChosenMesa");
  }

  chosenPay(){
    this.mainFunction.openModalSearch("wrapModalMetodoPago");
  }

  validateRequired(){
    if(this.variableGlobales.idMesa <= 0 || this.variableGlobales.idMesa === undefined){
      this.alert.alertError("Debe seleccionar una mesa","");
      return false;
    }
    return true;
  }

  receiveChangeCrud(crud:string){
    this.typeCrud = crud;
  }

  async receiveRegister(data:Platos){
    let updateDetalleCarrito:DetalleCarrito = new DetalleCarrito();
    let detaCarritoNow = this.variableGlobales.carrito.detalleCarritos.filter(d => d.idDetalleCarrito === data.idDetalleCarrito);
    if(detaCarritoNow.length > 0){
      updateDetalleCarrito = detaCarritoNow[0];
      updateDetalleCarrito.tiempoEspera = data.tiempoEspera;
      updateDetalleCarrito.precio = data.precioCarrito;
      updateDetalleCarrito.cantidad = data.cantidad;
      updateDetalleCarrito.comentario = data.observacion;
      updateDetalleCarrito.detalleCarritoPersonalizados = [];
      data.detallePlatos.forEach(detaPlato => {
        let addDetalleCarritoPersonalizado:DetalleCarritoPersonalizado = new DetalleCarritoPersonalizado();
        addDetalleCarritoPersonalizado.idProducto = detaPlato.idProducto;
        addDetalleCarritoPersonalizado.idMedida = detaPlato.idMedida;
        addDetalleCarritoPersonalizado.cantidad = detaPlato.cantidad;
        addDetalleCarritoPersonalizado.flagRequerido = detaPlato.flagSelect === true ? 1 : 0;
        updateDetalleCarrito.detalleCarritoPersonalizados.push(Object.assign({},addDetalleCarritoPersonalizado));
      });

      await this.detalleCarritoService.actualizar(updateDetalleCarrito).then();
      await this.getCarrito();
      this.alert.alertSucces("Modificado exitosamente");
    }
   
  }

  async receiveRegisterMesa(data:Mesa){
    if(data.idMesa !== this.variableGlobales.idMesa){

      let addClienteFunciones:ClienteFunciones = new ClienteFunciones();
      addClienteFunciones.idCliente = this.mainFunction.usuarioLogueado.clientes[0].idCliente;
      addClienteFunciones.idFuncion = 4;
      addClienteFunciones.campo1Int = data.idMesa;
      addClienteFunciones.descripcion = data.nombre;
      await this.clienteFuncionesService.changeMesa(addClienteFunciones,this.variableGlobales.idMesa).then();

      // await this.mesaFuncionesService.eliminar_ByMesa(this.variableGlobales.idMesa).then();

      // let addMesaFunciones:MesaFunciones = new MesaFunciones();
      // addMesaFunciones.idFuncion = 4;
      // addMesaFunciones.idMesa = data.idMesa;
      // addMesaFunciones.descripcion = data.nombre;
      // addMesaFunciones.horSolicitada = addMesaFunciones.horRegistro;
      // await this.mesaFuncionesService.registrar(addMesaFunciones).then();

      // let addClienteFunciones:ClienteFunciones = new ClienteFunciones();
      // addClienteFunciones.idCliente = this.mainFunction.usuarioLogueado.clientes[0].idCliente;
      // addClienteFunciones.idFuncion = 4;
      // addClienteFunciones.campo1Int = data.idMesa;
      // addClienteFunciones.descripcion = data.nombre;

      // this.variableGlobales.mesa = data.nombre;
      // this.variableGlobales.idMesa = data.idMesa;
      // await this.clienteFuncionesService.registro(addClienteFunciones).then();

      // for await(let funciones of this.variableGlobales.arrayClienteFunciones){
      //   if(funciones.idFuncion !== 4){
      //     let addMesaFunciones:MesaFunciones = new MesaFunciones();
      //     addMesaFunciones.idFuncion = funciones.idFuncion;
      //     addMesaFunciones.idMesa = data.idMesa;
      //     addMesaFunciones.descripcion = funciones.descripcion;
      //     addMesaFunciones.horSolicitada = funciones.horSolicitada;
      //     await this.mesaFuncionesService.registrar(addMesaFunciones).then();
      //   }
      // }
      
      await this.refreshClienteFunciones();

      this.alert.alertSucces("Mesa Cambiada exitosamente");
    }
  }

  async refreshClienteFunciones(){
    await this.clienteFuncionesService.buscar_ByCliente(this.mainFunction.usuarioLogueado.clientes[0].idCliente).then(resolve => {
      if(resolve.status === 200){
        this.variableGlobales.arrayClienteFunciones = resolve.body.message;
        this.variableGlobales.getDataFuncionCliente();
      }
    });
  }

  async getCarrito(){
    await this.carritoService.buscar_ByCliente(this.mainFunction.usuarioLogueado.clientes[0].idCliente).then(resolve => {
      if(resolve.status === 200 && resolve.body.response){
        this.variableGlobales.carrito = resolve.body.message;
      }
    });

    this.variableGlobales.innerPlatoCarrito();
  }

  //Filtros
  orderCarta(event: any) {
    if(event.value === 0)return;
    let maestro = this.variableGlobales.arrayOrden.filter(d => d.idDetalleMaestro === event.value)[0];

    switch (maestro.campo1Int) {
      case 1:
        this.variableGlobales.cartaReturnFilter.forEach(d => d.platos = this.filterItems.filterMenorMayor(d.platos,'precio'));
        break;
      case 2:
        this.variableGlobales.cartaReturnFilter.forEach(d => d.platos = this.filterItems.filterMayorMenor(d.platos,'precio'));
        break;
      case 3:
        this.variableGlobales.cartaReturnFilter = this.filterItems.filterOrdenAbec(this.variableGlobales.cartaReturnFilter,'nomCategoria','asc');
        this.variableGlobales.cartaReturnFilter.forEach(d => d.platos = this.filterItems.filterOrdenAbec(d.platos,'nombre','asc'));
        break;
      case 4:
        this.variableGlobales.cartaReturnFilter = this.filterItems.filterOrdenAbec(this.variableGlobales.cartaReturnFilter,'nomCategoria','desc');
        this.variableGlobales.cartaReturnFilter.forEach(d => d.platos = this.filterItems.filterOrdenAbec(d.platos,'nombre','desc'));
        break;
      default:
        console.log('No existe filtro');
    }
  }

  orderCategoria(event:any){
    if(event.value === 0)return;
    let maestro = this.variableGlobales.arrayCategoria.filter(d => d.idDetalleMaestro === event.value)[0];
    this.variableGlobales.cartaReturnFilter = [];
    this.variableGlobales.cartaReturn.forEach(deta => {
      if(deta.nomCategoria === maestro.nombre){
        let addCartaPlatosWeb = Object.assign({},deta);
        addCartaPlatosWeb.platos = [];
        deta.platos.forEach(p => addCartaPlatosWeb.platos.push(Object.assign({},p)));
        this.variableGlobales.cartaReturnFilter.push(Object.assign({},addCartaPlatosWeb));
      }
    });
    
  }
  orderPrecio(event:any){
    if(event.value === 0)return;
    let maestro = this.variableGlobales.arrayPrecio.filter(d => d.idDetalleMaestro === event.value)[0];
    this.variableGlobales.cartaReturnFilter.forEach(deta => {
      let cartaMain = this.variableGlobales.cartaReturn.filter(d => d.idCategoria === deta.idCategoria)[0];
      if(maestro.campo2Int === 0)deta.platos = cartaMain.platos.filter(d => d.precio >= maestro.campo1Int)
      else deta.platos = cartaMain.platos.filter(d => d.precio >= maestro.campo1Int && d.precio <= maestro.campo2Int)
    });
  }
  
}