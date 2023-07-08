import { SafeUrl } from "@angular/platform-browser";

export class Images{
    idImage:number = 0;
    base64:string = "";
    nombre:string = "";
    extension:string = "";
    file:File;
    rutaSave:string = "";
    ruta:SafeUrl;

    estado:number = 0;
}