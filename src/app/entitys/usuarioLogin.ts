
export class UsuarioLogin{
    constructor() {
        var f = new Date();
        var mes = ("0" + (f.getMonth() +1)).substr(-2,2);
        var day = ("0" + f.getDate()).substr(-2,2);

        this.fecRegistro = f.getFullYear() + "-" + mes + "-" + day ;
        this.fecModifica = f.getFullYear() + "-" + mes + "-" + day ;
    }
    idUsuarioLogin:number = 0;
    nombre:string = "";
    apellido:string = "";
    tipoDocumento:number = 0;
    nroDocumento:string = "";
    direccion:string = "";
    telefono:string = "";
    telefono2:string = "";
    correo:string = "";
    usuario:string = "";
    clave:string = "";

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
}