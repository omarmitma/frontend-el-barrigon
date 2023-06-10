import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit {

  tipoForm:number = 1;

  constructor() { }

  ngOnInit(): void {
  }

  changeTipeForm(tipo:number){
    
    let bg = document.querySelector('.background');
    bg?.classList.add('background-right');

    window.setTimeout(() => {
      this.tipoForm = tipo;
    },800)
    let fr = document.querySelector('.form');
    fr?.classList.add('form-left');
    
  }
}
