import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Images } from 'src/app/entitys/otros/images';
import { Alert } from './alerts';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { UsuarioLogin } from 'src/app/entitys/usuarioLogin';

@Injectable()
export class MainFunction {

    loadingMain:boolean = false;
    usuarioLogueado:UsuarioLogin = new UsuarioLogin();
    
    private hubConnection: HubConnection;

    constructor(private sanitizer:DomSanitizer, private alert:Alert){
      this.hubConnection = new HubConnectionBuilder()
        .withUrl('https://localhost:44328/hub')
        .build();
  
      this.startConnection();
    }
  
    private async startConnection() {
      try {
        await this.hubConnection.start();
        console.log('Conexión establecida con el hub de SignalR');
      } catch (error) {
        console.error('Error al establecer la conexión con el hub de SignalR:', error);
      }
    }
  
    public sendMessage(user: string, message: string) {
      this.hubConnection.invoke('SendMessage', user, message)
        .catch(error => console.error('Error al enviar el mensaje:', error));
    }
  
    public onReceiveMessage(callback: (user: string, message: string) => void) {
      this.hubConnection.on('ReceiveMessage', callback);
    }
    //Abrir el navegador
    openModalSearch(elementId:string){
        let contentNavigation = document.getElementById(elementId);
        if(contentNavigation?.classList.contains('wrapModalActive')){  
            document.body.classList.remove('modal-active');
            contentNavigation?.classList.remove('wrapModalActive');
        }
        else {
            contentNavigation?.classList.add('wrapModalActive');
            document.body.classList.add('modal-active');
        }
    }


    file:File;
    //Elegir imagen y guardarlo en variable de imagen - Devuelve una promesa 
    chosenImageDropzone(event:Event,dropZonaId:string): Promise<Images>{
        return new Promise((resolve, reject) => {
            let dropZone = <HTMLInputElement>document.getElementById(dropZonaId);

            //Obtenemos la imagen
            let img =  <HTMLInputElement>document.getElementById((event.target as Element).id);
            var filePath = img.value;
            console.log(img);
            console.log(img.value);
            //Extensiones permitidas
            var allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;

            //Verificamos si existe un filte
            if((<HTMLInputElement>event.target).files?.[0]! === undefined) resolve(new Images);
            
            if(!allowedExtensions.exec(filePath)){
                this.alert.alertError('Extensión no permitida.','Utiliza: .jpeg - .jpg - .png');
                img.value = '';
                resolve(new Images);
            }
            //Creamos una url object 
            let url = URL.createObjectURL((<HTMLInputElement>event.target).files?.[0]!);
            //Guardamos el file elegido
            this.file = (<HTMLInputElement>event.target).files?.[0]!;
            const fr = new FileReader();
            fr.readAsDataURL(this.file);
        
            let image:Images = new Images();
            
            fr.onload = (event:any)=>{
                image.file =  this.file;
                image.base64 = event.target.result;
                image.nombre = this.file.name;
                image.ruta = this.sanitizer.bypassSecurityTrustUrl(url);
                image.extension = "." + this.file.name.split(".").pop() || '';
                img.value = '';
                dropZone.classList.add('dropZoneWithImage');
                resolve(image);
            };
            
        })
    }

    //Evento drop agregar clase y quitar cuando suelten una imagen
    textDrop:string = "Arrastrar"
    eventDrop(id:string){
        let dropZone = document.getElementById(id) as HTMLElement;
        if(dropZone === null) return;
        dropZone.addEventListener('dragover',(e)=>this.dropActive(id));
        dropZone.addEventListener('dragenter',(e)=>this.dropActive(id));
        dropZone.addEventListener('dragleave',(e)=>this.dropDesactive(id));
        dropZone.addEventListener('dragend',(e)=>this.dropDesactive(id));
        dropZone.addEventListener('drop',(e)=>{
            this.dropDesactive(id);
            dropZone.classList.add('dropZoneWithImage');
        });
    }
    dropActive(id:string){
        let dropZone = document.getElementById(id) as HTMLElement;
        dropZone.classList.add('dropZoneActive');

        this.textDrop = "Soltar";
    }
    dropDesactive(id:string){
        let dropZone = document.getElementById(id) as HTMLElement;
        dropZone.classList.remove('dropZoneActive');
        this.textDrop = "Arrastrar";
    }

    //Guardar token al loguearse
    addSessionToken(usuario:any){
        localStorage.setItem('userData', JSON.stringify(usuario));
    }
}