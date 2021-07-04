import { Component, OnInit } from '@angular/core';
import {TradingPalRestClient} from '../service/tradingPalRestClient';

@Component({
  selector: 'app-stock-detail-list',
  templateUrl: './stock-detail-list.component.html',
  styleUrls: ['./stock-detail-list.component.css']
})
export class StockDetailListComponent implements OnInit {


  stockData = [];
  constructor(private tradingPalRestClient: TradingPalRestClient) {
    this.stockData.push({ticker: 'HPC', name: 'HP', valueSek: 125});
    this.stockData.push({ticker: 'KIND.ST', name: 'Kindred', valueSek: 192});

    const data = tradingPalRestClient.getData();
    data.subscribe(data2 => {
      console.log(data2);
    });
  }

  ngOnInit() {
  }

}
