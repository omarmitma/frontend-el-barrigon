import { DetalleCarritoPersonalizado } from "./detalleCarritoPersonalizado";

export class DetalleCarrito{
    constructor() {
        var f = new Date();
        var mes = ("0" + (f.getMonth() +1)).substr(-2,2);
        var day = ("0" + f.getDate()).substr(-2,2);

        this.fecRegistro = f.getFullYear() + "-" + mes + "-" + day ;
        this.fecModifica = f.getFullYear() + "-" + mes + "-" + day ;
    }
    idDetalleCarrito:number = 0;
    idCarrito:number = 0;
    idPlato:number = 0;
    tiempoEspera:string = "";
    precio:number = 0;
    cantidad:number = 0;
    comentario:string = "";
    flagPedido:number = 0;

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

    nomPlato:string = "";
    nomCategoria:string = "";
    urlImagen:string = "";

    detalleCarritoPersonalizados:DetalleCarritoPersonalizado[] = [];
}