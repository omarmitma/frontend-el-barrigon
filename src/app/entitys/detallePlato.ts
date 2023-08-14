export class DetallePlato{
    constructor() {
        var f = new Date();
        var mes = ("0" + (f.getMonth() +1)).substr(-2,2);
        var day = ("0" + f.getDate()).substr(-2,2);

        this.fecRegistro = f.getFullYear() + "-" + mes + "-" + day ;
        this.fecModifica = f.getFullYear() + "-" + mes + "-" + day ;
    }

    idDetallePlato:number = 0;
    idPlato:number = 0;
    idProducto:number = 0;
    idMedida:number = 0;
    cantidad:number = 0;
    cantidadMaxima:number = 0;
    flagRequerido:number = 0;
    flagRequeridoBool:boolean = false;

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
    nomMedida:string = "";
    abrMedida:string = "";
    precioUnit:number = 0;
    urlImagen:string = "";
    nomCategoria:string = "";

    flagSelect:boolean = true;
}
