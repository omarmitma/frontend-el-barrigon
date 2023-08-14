
import { Images } from "./otros/images";
import { DetallePlato } from "./detallePlato";
import { DetalleCarrito } from "./detalleCarrito";
import { DetallePedido } from "./detallePedido";

export class Platos{
    constructor() {
        var f = new Date();
        var mes = ("0" + (f.getMonth() +1)).substr(-2,2);
        var day = ("0" + f.getDate()).substr(-2,2);

        this.fecRegistro = f.getFullYear() + "-" + mes + "-" + day ;
        this.fecModifica = f.getFullYear() + "-" + mes + "-" + day ;
    }

    idPlato:number = 0;
    idLinea:number = 0;
    idSubLinea:number = 0;
    idCategoria:number = 0;
    nombre:string = "";
    abreviatura:string = "";
    precio:number = 0;
    precioCarrito:number = 0;
    precioAdicional:number = 0;
    precioOferta:number = 0;
    urlImagen:string = "";
    tiempoEspera:string = "";
    observacion:string = "";
    imagen:Images = new Images();
    idDetalleCarrito:number = 0;

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

    nomCategoria:string  = "";
    flagInShoppingCar:boolean = false;
    cantidad:number = 0;

    detalleCarritos:DetalleCarrito[] = [];
    detallePedidos:DetallePedido[] = [];
    detallePlatos:DetallePlato[] = [];
}

