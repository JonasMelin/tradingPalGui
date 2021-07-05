import { Component, OnInit } from '@angular/core';
import { TradingPalRestClient } from '../service/tradingPalRestClient';
import { StocksToTrade } from '../model/StocksToTrade';

@Component({
  selector: 'app-stock-detail-list',
  templateUrl: './stock-detail-list.component.html',
  styleUrls: ['./stock-detail-list.component.css']
})
export class StockDetailListComponent implements OnInit {

  refreshIntervalSec = 30;

  tradingPalRestClient: TradingPalRestClient;
  stocksToBuy: StocksToTrade = new StocksToTrade();
  stocksToSell: StocksToTrade = new StocksToTrade();

  constructor(private restClient: TradingPalRestClient) {
    this.tradingPalRestClient = restClient;
    setInterval(this.getStocksToBuy.bind(this), this.refreshIntervalSec * 1000);
    setInterval(this.getStocksToSell.bind(this), this.refreshIntervalSec * 1000);
    this.getStocksToBuy();
    this.getStocksToSell();
  }

  ngOnInit() {
  }

  getStocksToSell() {
    console.log('Updating stocks to sell');
    this.tradingPalRestClient.getStocksToSell().subscribe(retData => {
      this.stocksToSell = retData;
    });
  }

  getStocksToBuy() {
    console.log('Updating stocks to buy');
    this.tradingPalRestClient.getStocksToBuy().subscribe(retData => {
      this.stocksToBuy = retData;
    });
  }
}
