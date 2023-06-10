import { Component, OnInit } from '@angular/core';
import { MainFunction } from 'src/app/shared/functions/mainFunction';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(public mainFunction:MainFunction) { }

  ngOnInit(): void {
  }

}
