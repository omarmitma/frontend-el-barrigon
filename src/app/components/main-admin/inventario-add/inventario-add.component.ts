import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DetallePlato } from 'src/app/entitys/detallePlato';
import { Images } from 'src/app/entitys/otros/images';
import { Platos } from 'src/app/entitys/platos';
import { Producto } from 'src/app/entitys/producto';
import { PlatoService } from 'src/app/services/plato.service';
import { Alert } from 'src/app/shared/functions/alerts';
import { CloudinaryFunction } from 'src/app/shared/functions/cloudinary';
import { MainFunction } from 'src/app/shared/functions/mainFunction';
import { ValidationForms } from 'src/app/shared/functions/validation';
import { VariablesGlobales } from 'src/app/shared/functions/variablesGlobales';

@Component({
  selector: 'app-inventario-add',
  templateUrl: './inventario-add.component.html',
  styleUrls: ['./inventario-add.component.scss']
})
export class InventarioAddComponent implements OnInit {

  typeCrud:string = "";
  plato:Platos = new Platos();

  constructor(public mainFunction:MainFunction, private activatedRoute: ActivatedRoute, private platosService:PlatoService, public variableGlobales:VariablesGlobales,
    private objectValidation:ValidationForms, private alert:Alert,private router:Router, private cloudinaryFunction:CloudinaryFunction){}

  ngOnInit(): void {
    this.plato.idPlato = this.activatedRoute.snapshot.params['idPlato'];
    if(this.plato.idPlato > 0)this.typeCrud = "EDITAR";
    else this.typeCrud = "AGREGAR";
    this.getOpById();
  }

  async getOpById(){
    if(this.plato.idPlato <= 0 || this.plato.idPlato === undefined)return;

    await this.platosService.buscarAll_Inner_by_id(this.plato.idPlato).then(resolve => {
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

  productosChosenPlato:Producto[] = [];
  openModalChosenProductos(){
    this.productosChosenPlato = [];
    this.plato.detallePlatos.forEach(detaPlato => {
      let productoNow = Object.assign({},this.variableGlobales.productosArray.filter(p => p.idProducto === detaPlato.idProducto)[0]);
      productoNow.cantidad = detaPlato.cantidad;
      productoNow.flagRequerido = detaPlato.flagRequeridoBool;
      this.productosChosenPlato.push(Object.assign({},productoNow));
    });
    this.mainFunction.openModalSearch("wrapModalChosenProductos");
  }

  receiveChangeCrudProducto(data:string){
    this.productosChosenPlato = [];
  }
  receiveRegisterProductos(data:Producto[]){
    this.plato.detallePlatos = [];
    data.forEach(d => {
      let addDetallePlato:DetallePlato = new DetallePlato();
      addDetallePlato.idProducto = d.idProducto;
      addDetallePlato.urlImagen = d.urlImagen;
      addDetallePlato.idMedida = d.idUnidad;
      addDetallePlato.cantidad = d.cantidad;
      addDetallePlato.cantidadMaxima = d.cantidad;
      addDetallePlato.flagRequeridoBool = d.flagRequerido;
      addDetallePlato.nomProducto = d.nombre;
      addDetallePlato.nomMedida = d.nomUnidad;
      addDetallePlato.abrMedida = d.abrUnidad;
      addDetallePlato.precioUnit = d.precio;

      this.plato.detallePlatos.push(Object.assign({},addDetallePlato));
    });
  }

  deleteRegister(data:DetallePlato){
    this.plato.detallePlatos = this.plato.detallePlatos.filter(p => p !== data);
  }

  async grabar(){

    let validate:boolean = await this.objectValidation.validatePlato(this.plato);
    if(!validate)return;

    this.plato.usuModifica = this.mainFunction.usuarioLogueado.idUsuarioLogin;
    this.plato.usuRegistro = this.mainFunction.usuarioLogueado.idUsuarioLogin;

    this.plato.detallePlatos.forEach(deta => {
      if(deta.flagRequeridoBool) deta.flagRequerido = 1;
      else deta.flagRequerido = 0;
    })

    if(this.verificarSiTieneImagenes()){
      await this.addImages();
    }

    if(this.plato.idPlato > 0){
      //update plato
      await this.platosService.actualizar(this.plato).then();
      this.alert.alertSucces("Plato editado Correctamente");
      this.router.navigate(['/admin/inventario']);
    }
    else{
      //create plato
      await this.platosService.registro(this.plato).then();
      this.alert.alertSucces("Plato agregado Correctamente");
      this.router.navigate(['/admin/inventario']);
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
