import { Component, OnInit } from '@angular/core';
import { Platos } from 'src/app/entitys/platos';
import { MainFunction } from 'src/app/shared/functions/mainFunction';

@Component({
  selector: 'app-inventario-add',
  templateUrl: './inventario-add.component.html',
  styleUrls: ['./inventario-add.component.scss']
})
export class InventarioAddComponent implements OnInit {

  plato:Platos = new Platos();

  constructor(public mainFunction:MainFunction){}

  ngOnInit(): void {
  }

  file:File;
  //Elegir imagen y guardarlo en variable de imagen
  chosenImage(event:Event){
    this.file = (<HTMLInputElement>event.target).files?.[0]!;

    this.mainFunction.chosenImageDropzone(event,"dropZoneAddImage")
    .then(resolve => {
      if(resolve.file !== undefined)this.plato.imagen = resolve;
    });

  }

  //Eliminar imagen subida
  deleteImage(){
    let dropZone = document.getElementById('dropZoneAddImage') as HTMLInputElement;
    let imagenButtonAddImage = document.getElementById('imagenButtonAddImage') as HTMLInputElement;
    let inputImageDropZone = document.getElementById('inputImageDropZone') as HTMLInputElement;

    //Eliminar imagen de input file
    dropZone.classList.remove('dropZoneWithImage');
    imagenButtonAddImage.value = "";
    inputImageDropZone.value = "";
  }

}
