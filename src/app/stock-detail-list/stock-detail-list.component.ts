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
  stocksToBuy: StocksToTrade = new StocksToTrade();
  stocksToSell: StocksToTrade = new StocksToTrade();
  timeoutCounter = 100;
  timeoutNormalIntervalSec = 30;
  lastUpdateVersionBuy = 0;

  constructor(private restClient: TradingPalRestClient) {
    this.tradingPalRestClient = restClient;
    this.timeOutCallback();
  }

  ngOnInit() {
  }

  timeOutCallback() {
    try {
      if (this.timeoutCounter >= this.timeoutNormalIntervalSec || this.isFastRefresh()) {
        this.timeoutCounter = 0;
        this.getStocksToSell();
        this.getStocksToBuy();
      } else {
        this.timeoutCounter ++;
      }
    } catch (e) {
      console.log('Error when getting stocks to sell or buy: ', e);
    } finally {
      setTimeout(this.timeOutCallback.bind(this),  1000);
    }
  }

  getStocksToSell() {
    this.tradingPalRestClient.getStocksToSell().subscribe(retData => {
      this.stocksToSell = retData;
    });
  }

  getStocksToBuy() {
    this.tradingPalRestClient.getStocksToBuy().subscribe(retData => {
      this.stocksToBuy = retData;
      this.setRefreshRate(this.stocksToBuy);
    });
  }

  isFastRefresh() {
    return window['tradingpaldata']['fastRefresh'];
  }

  setFastRefresh(value: boolean) {
    window['tradingpaldata']['fastRefresh'] = value;
  }

  setRefreshRate(stocksToBuy: StocksToTrade) {
    if ( this.lastUpdateVersionBuy !== stocksToBuy.updateVersion) {
      this.setFastRefresh(false);
    }
    this.lastUpdateVersionBuy = stocksToBuy.updateVersion;
  }
}
