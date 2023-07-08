import { DetalleCarritoPersonalizado } from "./detalleCarritoPersonalizado";
import { DetallePedidoPersonalizado } from "./detallePedidoPersonalizado";
import { DetallePlato } from "./detallePlato";

export class Producto{
    constructor() {
        var f = new Date();
        var mes = ("0" + (f.getMonth() +1)).substr(-2,2);
        var day = ("0" + f.getDate()).substr(-2,2);

        this.fecRegistro = f.getFullYear() + "-" + mes + "-" + day ;
        this.fecModifica = f.getFullYear() + "-" + mes + "-" + day ;
    }

    // idIngrediente:number = 0;
    // nomIngrediente:string = "";
    // precioUnit:number = 0;
    // urlImagen:string = "";
    // idCategoria:number = 0;
    // nomCategoria:string = "";
    // observacion:string = "";
    // idUnidad:number = 0;
    // nomUnidad:string = "";
    // cantidad:number = 0;

    idProducto:number = 0;
    nombre:string = "";
    precio:number = 0;
    idLinea:number = 0;
    idSubLinea:number = 0;
    idCategoria:number = 0;
    idUnidad:number = 0;
    urlImagen:string = "";
    observacion:string = "";

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

    nomProducto:string = "";
    nomLinea:string = "";
    nomSubLinea:string = "";
    nomCategoria:string = "";
    abrUnidad:string = "";
    nomUnidad:string = "";

    detalleCarritoPersonalizados:DetalleCarritoPersonalizado[] = [];
    detallePedidoPersonalizados:DetallePedidoPersonalizado[] = [];
    detallePlatos:DetallePlato[] = [];
}
