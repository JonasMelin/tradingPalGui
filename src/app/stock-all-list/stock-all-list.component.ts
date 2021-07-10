import { Component, OnInit } from '@angular/core';
import {TradingPalRestClient} from '../service/tradingPalRestClient';
import {StocksToTrade} from '../model/StocksToTrade';

@Component({
  selector: 'app-stock-all-list',
  templateUrl: './stock-all-list.component.html',
  styleUrls: ['./stock-all-list.component.css']
})
export class StockAllListComponent implements OnInit {

  private tradingPalRestClient: TradingPalRestClient;
  private allStocks: StocksToTrade = new StocksToTrade();
  private lastUpdateVersionBuy = 0;
  private timeoutCounter = 100;
  private timeoutNormalIntervalSec = 30;

  constructor(private restClient: TradingPalRestClient) {
    this.tradingPalRestClient = restClient;
    this.timeOutCallback();
  }

  ngOnInit() {
    this.getAllStocks();
  }

  getAllStocks() {
    this.tradingPalRestClient.getAllStocks().subscribe(retData => {
      console.log('All stocks: ', retData);

      this.allStocks = retData;
    });
  }

  timeOutCallback() {
    try {
      if (this.timeoutCounter >= this.timeoutNormalIntervalSec || this.isFastRefresh()) {
        this.timeoutCounter = 0;
        this.getAllStocks();
      } else {
        this.timeoutCounter ++;
      }
    } catch (e) {
      console.log('Error when getting all stocks: ', e);
    } finally {
      setTimeout(this.timeOutCallback.bind(this),  1000);
    }
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
