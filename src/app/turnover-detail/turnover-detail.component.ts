import {Component, Input, OnInit} from '@angular/core';
import {Turnover} from '../model/Turnover';

@Component({
  selector: 'app-turnover-detail',
  templateUrl: './turnover-detail.component.html',
  styleUrls: ['./turnover-detail.component.css']
})
export class TurnoverDetailComponent implements OnInit {

  @Input() private title: string;
  @Input() private soldForSek: number;
  @Input() private boughtForSek: number;

  constructor() { }

  ngOnInit() {
  }

  private getTurnover() {
    return this.boughtForSek + this.soldForSek;
  }

}
