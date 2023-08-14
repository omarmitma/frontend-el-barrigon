import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Producto } from 'src/app/entitys/producto';
import { ProductoService } from 'src/app/services/producto.service';
import { Alert } from 'src/app/shared/functions/alerts';
import { MainFunction } from 'src/app/shared/functions/mainFunction';
import { VariablesGlobales } from 'src/app/shared/functions/variablesGlobales';

@Component({
  selector: 'app-modal-chosen-productos',
  templateUrl: './modal-chosen-productos.component.html',
  styleUrls: ['./modal-chosen-productos.component.scss']
})
export class ModalChosenProductosComponent implements OnInit, OnChanges{

  @Input() productosChosenPlato:Producto[] = [];

  @Output() sendRegister:EventEmitter<Producto[]> = new EventEmitter<Producto[]>();
  @Output() changeCrud:EventEmitter<string> = new EventEmitter<string>();

  productosFilter:Producto[] = [];
  productosChosen:Producto[] = [];
  filter:string = "";

  constructor(private mainFunction:MainFunction, public variableGlobales:VariablesGlobales, private alert:Alert, private productoService:ProductoService){}
  async ngOnChanges(changes: SimpleChanges): Promise<void> {
    this.productosChosen = [];
    this.productosChosenPlato.forEach(p => this.productosChosen.push(Object.assign({},p)));
    await this.getData();
  }

  async ngOnInit(): Promise<void> {
    await this.getData();
  }

  async getData(){
    await this.productoService.buscarAll_Inner().then(resolve => {
      if(resolve.status === 200){
        this.variableGlobales.productosArray = resolve.body.message;
        this.productosFilter = this.variableGlobales.productosArray;
      }
    });
  }

  filterData(){
    this.productosFilter = this.variableGlobales.productosArray.filter(p => p.nombre.toLocaleLowerCase().includes(this.filter.toLocaleLowerCase()));
  }

  chosenRegister(data:Producto){
    if(this.productosChosen.filter(p => p.idProducto === data.idProducto).length > 0)return;
    this.productosChosen.push(Object.assign({},data));
  }

  deleteRegister(data:Producto){
    this.productosChosen = this.productosChosen.filter(p => p !== data);
  }
  //Abrir/Cerrar Modal para buscar
  openModal(){
    this.changeCrud.emit(" ");
    this.mainFunction.openModalSearch("wrapModalChosenProductos");
  }
  
  addRegister(){
    this.sendRegister.emit(this.productosChosen);
    this.openModal();
  }
}
