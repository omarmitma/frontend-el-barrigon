import { Component, Input, OnInit } from '@angular/core';
import { TextShared } from '../../functions/textShared';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {
  
  @Input() loadingActive:boolean = true;

  constructor(public textShared:TextShared) { }

  ngOnInit(): void {
  }

}
