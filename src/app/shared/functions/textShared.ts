import { Injectable } from "@angular/core";

@Injectable()
export class TextShared {

    constructor(){}

    textCarga:string = "";
    typeService:string = "";
    cronometro:string = "";

    s:number = 0;
    m:number = 0;
    h:number = 0;

    timoutCarga:any;

    empezarCronometro(){

        var hAux, mAux, sAux;
        this.s++;
        if (this.s>59){this.m++;this.s=0;}
        if (this.m>59){this.h++;this.m=0;}
        if (this.h>24){this.h=0;}
    
        if (this.s<10){sAux="0"+this.s;}else{sAux=this.s;}
        if (this.m<10){mAux="0"+this.m;}else{mAux=this.m;}
        if (this.h<10){hAux="0"+this.h;}else{hAux=this.h;}

        this.cronometro = mAux + ":" + sAux;

        this.timoutCarga = setTimeout(()=>{
            this.empezarCronometro();
          }, 1000);
    }

    resetCronometro(){
        this.s = 0;
        this.m = 0;
        this.h = 0;
        clearTimeout(this.timoutCarga);

        this.empezarCronometro();
    }
}