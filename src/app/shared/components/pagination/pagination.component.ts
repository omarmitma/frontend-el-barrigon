import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit ,OnChanges {

  //Paginacion
  @Input() pageAll:number[] = [];
  @Input() pageActive:number = 1;

  @Output() sendPageActive:EventEmitter<number> = new EventEmitter<number>();

  pageFilter:number[] = [];
  
  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['pageAll'] !== undefined){
      this.pageVisible();
    }
  }

  ngOnInit(): void {
    this.pageVisible();
  }


  pageVisible(){
    this.pageFilter = [];
    if(this.pageAll.length > 6){
      if(this.pageActive < 3 || this.pageActive > this.pageAll[this.pageAll.length - 3]){
        let firstNums = this.pageAll.slice(0, 3);
        let lastNums = this.pageAll.slice(this.pageAll.length - 3,this.pageAll.length);
  
        this.pageFilter = firstNums.concat(lastNums);
      }
      else{
        let firstNums = this.pageAll.slice(0, 1);
        let lastNums = this.pageAll[this.pageAll.length-1];
        let mediumNums = this.pageAll.slice(this.pageAll.indexOf(this.pageActive) - 1,this.pageAll.indexOf(this.pageActive) + 2);
  
        this.pageFilter = firstNums.concat(mediumNums).concat(lastNums);
      }
    }
    else this.pageFilter = this.pageAll;
  }
  //Cambiar de pagina
  changePageNum(num:number){
    this.pageActive = num;
    this.pageVisible();
    this.sendPageActive.emit(this.pageActive);
  }
  //Retroceder pagina
  prevPageNum(){
    if(this.pageActive <= 1)this.pageActive = 1;
    else this.pageActive -= 1;
    this.pageVisible();
    this.sendPageActive.emit(this.pageActive);
  }

  //Siguiente pagina
  nextPageNum(){
    if(this.pageActive >= this.pageAll[this.pageAll.length - 1])this.pageActive = this.pageAll[this.pageAll.length - 1];
    else this.pageActive += 1;
    this.pageVisible();
    this.sendPageActive.emit(this.pageActive);
  }
}
