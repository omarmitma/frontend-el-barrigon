import { Carrito } from "./carrito";
import { MesaFunciones } from "./mesaFunciones";
import { Pedido } from "./pedido";
import { Reserva } from "./reserva";

export class Mesa{
    constructor() {
        var f = new Date();
        var mes = ("0" + (f.getMonth() +1)).substr(-2,2);
        var day = ("0" + f.getDate()).substr(-2,2);

        this.fecRegistro = f.getFullYear() + "-" + mes + "-" + day ;
        this.fecModifica = f.getFullYear() + "-" + mes + "-" + day ;
    }
    
    idMesa:number = 0;
    nombre:string = "";
    capacidad:number = 0;
    estadoMesa:number = 0;

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

    carritos:Carrito[] = [];
    mesaFunciones:MesaFunciones[] = [];
    pedidos:Pedido[] = [];
    reservas:Reserva[] = [];

    tiempoRecurrido:string = "";
}