import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DetallePlato } from 'src/app/entitys/detallePlato';
import { Images } from 'src/app/entitys/otros/images';
import { Producto } from 'src/app/entitys/producto';
import { ProductoService } from 'src/app/services/producto.service';
import { Alert } from 'src/app/shared/functions/alerts';
import { CloudinaryFunction } from 'src/app/shared/functions/cloudinary';
import { MainFunction } from 'src/app/shared/functions/mainFunction';
import { ValidationForms } from 'src/app/shared/functions/validation';
import { VariablesGlobales } from 'src/app/shared/functions/variablesGlobales';


@Component({
  selector: 'app-inventario-ingrediente-add',
  templateUrl: './inventario-ingrediente-add.component.html',
  styleUrls: ['./inventario-ingrediente-add.component.scss']
})
export class InventarioIngredienteAddComponent implements OnInit {
  typeCrud:string = "";
  plato:Producto = new Producto();

  constructor(public mainFunction:MainFunction, private activatedRoute: ActivatedRoute, private ProductoService:ProductoService, public variableGlobales:VariablesGlobales,
    private objectValidation:ValidationForms, private alert:Alert,private router:Router, private cloudinaryFunction:CloudinaryFunction){}

  ngOnInit(): void {
    this.plato.idProducto = this.activatedRoute.snapshot.params['idProducto'];
    if(this.plato.idProducto > 0)this.typeCrud = "EDITAR";
    else this.typeCrud = "AGREGAR";
    this.getOpById();
  }

  async getOpById(){
    if(this.plato.idProducto <= 0 || this.plato.idProducto === undefined)return;

    await this.ProductoService.buscarAll_Inner_by_id(this.plato.idProducto).then(resolve => {
      if(resolve.status === 200){
        this.plato = resolve.body.message;
        this.plato.imagen = new Images();
      }
    });
  }

  //Elegir imagen y guardarlo en variable de imagen
  chosenImage(event:Event){
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
    this.plato.imagen = new Images();
    this.plato.urlImagen = "";
  }
  

  async grabar(){

    let validate:boolean = await this.objectValidation.validateProducto(this.plato);
    if(!validate)return;

    this.plato.usuModifica = this.mainFunction.usuarioLogueado.idUsuarioLogin;
    this.plato.usuRegistro = this.mainFunction.usuarioLogueado.idUsuarioLogin;

    if(this.verificarSiTieneImagenes()){
      await this.addImages();
    }


    if(this.plato.idProducto > 0){
      //update plato
      await this.ProductoService.actualizar(this.plato).then();
      this.alert.alertSucces("Plato editado Correctamente");
      this.router.navigate(['/admin/ingredientes']);
    }
    else{
      //create plato
      await this.ProductoService.registro(this.plato).then();
      this.alert.alertSucces("Plato agregado Correctamente");
      this.router.navigate(['/admin/ingredientes']);
    }
  }

  //Verificar si tiene imagenes
  verificarSiTieneImagenes():boolean{
    if(this.plato.imagen.file !== undefined) return true;
    return false;
  }

  //Metodo par aagregar las imagenes
  async addImages(){
    await this.cloudinaryFunction.uploadCloudinary(this.plato.imagen.file).then(resolve=>{
      if(resolve.length > 2){
        this.plato.urlImagen = resolve;
        this.plato.imagen = new Images();
      }
    });
  }
}
