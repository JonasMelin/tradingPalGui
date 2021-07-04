import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stock-detail-list',
  templateUrl: './stock-detail-list.component.html',
  styleUrls: ['./stock-detail-list.component.css']
})
export class StockDetailListComponent implements OnInit {


  stockData = [];
  constructor() {
    this.stockData.push({ticker: 'HPC', name: 'HP', valueSek: 125});
    this.stockData.push({ticker: 'KIND.ST', name: 'Kindred', valueSek: 192});
  }

  ngOnInit() {
  }

}
