import { Injectable } from "@angular/core";

import Swal from 'sweetalert2';

@Injectable()
export class Alert {
    constructor(){}

    alertError(title:string,text:string){
        Swal.fire({
            title: title,
            text: text,
            icon: 'error',
            confirmButtonText: "OK"
        })
    }

    alertDefault(title:string,text:string){
        Swal.fire(
            title,
            text,
            'info'
        )
    }

    alertErrorHtml(text:string){
        Swal.fire({
            title: "Ocurrio un error",
            html:`<p class="textPersonalizedSweetAlert">${text}</p>`,
            icon: 'error',
            confirmButtonText: "OK"
        })
    }

    alertErrorHtml2(title:string,text:string){
        Swal.fire({
            title: title,
            html:`<p class="textPersonalizedSweetAlert">${text}</p>`,
            icon: 'error',
            confirmButtonText: "OK"
        })
    }

    alertErrorValidation(text:string){
        Swal.fire({
            title: "Error al validar",
            html:`<div class="textPersonalizedSweetAlertValidation">${text}</div>`,
            icon: 'error',
            confirmButtonText: "OK"
        })
    }

    alertSucces(title:string){
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: title,
            showConfirmButton: false,
            timer: 1400
        })
    }

    alertConfirm(title:string,text:string){
        return Swal.fire({
            title: title,
            text: text,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Aceptar'
        });
    }

    alertYesNo(title:string,text:string){
        return Swal.fire({
            title: title,
            text: text,
            icon: 'question',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'SI',
            cancelButtonText: 'NO',
            showCancelButton: true,
            showCloseButton: true
            
        });
    }

    alertQuestion(title:string,text:string){
        return Swal.fire({
            title: title,
            text: text,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Aceptar'
        });
    }

    alertValue(title:string){
        return Swal.fire({
            title: title,
            input: 'number',
            showCancelButton: true,
            confirmButtonText: 'Ok',
            cancelButtonText: 'Cancelar',
        });
    }

    alertGetValue(title:string){
        return Swal.fire({
            title: title,
            input: 'text',
            inputAttributes: {
              autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: 'Aceptar',
            showLoaderOnConfirm: true,
            preConfirm: (login) => {
              return login
            },
          });
    }
}