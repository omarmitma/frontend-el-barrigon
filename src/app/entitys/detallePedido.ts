import { DetallePedidoPersonalizado } from "./detallePedidoPersonalizado";

export class DetallePedido{
    constructor() {
        var f = new Date();
        var mes = ("0" + (f.getMonth() +1)).substr(-2,2);
        var day = ("0" + f.getDate()).substr(-2,2);

        this.fecRegistro = f.getFullYear() + "-" + mes + "-" + day ;
        this.fecModifica = f.getFullYear() + "-" + mes + "-" + day ;
    }
    idDetallePedido:number = 0;
    idPedido:number = 0;
    idPlato:number = 0;
    tiempoEspera:string = "";
    precio:number = 0;
    cantidad:number = 0;
    comentario:string = "";

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

    detallePedidoPersonalizados:DetallePedidoPersonalizado[] = [];
}