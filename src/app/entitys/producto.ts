import { DetalleCarritoPersonalizado } from "./detalleCarritoPersonalizado";
import { DetallePedidoPersonalizado } from "./detallePedidoPersonalizado";
import { DetallePlato } from "./detallePlato";
import { Images } from "./otros/images";

export class Producto{
    constructor() {
        var f = new Date();
        var mes = ("0" + (f.getMonth() +1)).substr(-2,2);
        var day = ("0" + f.getDate()).substr(-2,2);

        this.fecRegistro = f.getFullYear() + "-" + mes + "-" + day ;
        this.fecModifica = f.getFullYear() + "-" + mes + "-" + day ;
    }
    idProducto:number = 0;
    nombre:string = "";
    precio:number = 0;
    idLinea:number = 0;
    idSubLinea:number = 0;
    idCategoria:number = 0;
    idUnidad:number = 0;
    urlImagen:string = "";
    observacion:string = "";
    imagen:Images = new Images();

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

    nomLinea:string = "";
    nomSubLinea:string = "";
    nomCategoria:string = "";
    abrUnidad:string = "";
    nomUnidad:string = "";

    cantidad:number = 0;
    flagRequerido:boolean = false;

    detalleCarritoPersonalizados:DetalleCarritoPersonalizado[] = [];
    detallePedidoPersonalizados:DetallePedidoPersonalizado[] = [];
    detallePlatos:DetallePlato[] = [];
}
