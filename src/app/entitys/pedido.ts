import { DetallePedido } from "./detallePedido";
import { Venta } from "./venta.";

export class Pedido{
    constructor() {
        var f = new Date();
        var mes = ("0" + (f.getMonth() +1)).substr(-2,2);
        var day = ("0" + f.getDate()).substr(-2,2);

        this.fecRegistro = f.getFullYear() + "-" + mes + "-" + day ;
        this.fecModifica = f.getFullYear() + "-" + mes + "-" + day ;
    }
    idPedido:number = 0;
    idMesa:number = 0;
    idCliente:number = 0;
    cantidadPersonas:number = 0;
    tipoPago:number = 0;
    totalPago:number = 0;
    descuento:number = 0;

    fecRegistro:string = "";
    horRegistro:string = "";
    usuRegistro:number = 0;
    nomUsuRegistro:string = "";
    fecModifica:string = "";
    horModifica:string = "";
    usuModifica:number = 0;
    nomUsuModifica:string = "";
    estado:number = 0;
    accion:number = 0;

    nomMesa:string = "";
    
    detallePedidos:DetallePedido[] = [];
    venta:Venta[] = [];
}

