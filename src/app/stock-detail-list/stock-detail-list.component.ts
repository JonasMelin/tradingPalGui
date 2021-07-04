import { Component, OnInit } from '@angular/core';
import { TradingPalRestClient } from '../service/tradingPalRestClient';
import { StocksToTrade } from '../model/StocksToTrade';

@Component({
  selector: 'app-stock-detail-list',
  templateUrl: './stock-detail-list.component.html',
  styleUrls: ['./stock-detail-list.component.css']
})
export class StockDetailListComponent implements OnInit {


  tradingPalRestClient: TradingPalRestClient;
  stockData = [];
  stocksToTrade: StocksToTrade = new StocksToTrade();

  constructor(private restClient: TradingPalRestClient) {
    this.tradingPalRestClient = restClient;
    this.getStocksToBuy();

  }

  ngOnInit() {
  }

  getStocksToBuy() {
    this.tradingPalRestClient.getData().subscribe(retData => {
      this.stocksToTrade = retData;
      console.log(this.stocksToTrade)
      this.stockData.push({ticker: 'HPC', name: 'HP', valueSek: 125});
      this.stockData.push({ticker: 'KIND.ST', name: 'Kindred', valueSek: 192});
    });
  }

}
