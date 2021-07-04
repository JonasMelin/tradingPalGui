import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-stock-details',
  templateUrl: './stock-details.component.html',
  styleUrls: ['./stock-details.component.css']
})
export class StockDetailsComponent implements OnInit {
  @Input() name: string;
  @Input() ticker: string;
  @Input() valueSek: number;
  date = new Date().toLocaleTimeString();
  constructor() { }

  ngOnInit() {
  }

}
