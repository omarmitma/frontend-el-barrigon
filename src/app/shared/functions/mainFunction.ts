import { Injectable } from '@angular/core';

@Injectable()
export class MainFunction {

    loadingMain:boolean = false;
    usuarioLogueado:string = "OMAR";
    
    constructor(){

    }

    //Abrir el navegador
    openModalSearch(elementId:string){
        let contentNavigation = document.getElementById(elementId);
        if(contentNavigation?.classList.contains('wrapModalActive'))contentNavigation?.classList.remove('wrapModalActive');

        else contentNavigation?.classList.add('wrapModalActive');
    }
}