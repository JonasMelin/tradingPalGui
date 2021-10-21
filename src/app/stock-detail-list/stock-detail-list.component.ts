import { Component, OnInit } from '@angular/core';
import { TradingPalRestClient } from '../service/tradingPalRestClient';
import { StocksToTrade } from '../model/StocksToTrade';
import {Transactions} from '../model/Transactions';

@Component({
  selector: 'app-stock-detail-list',
  templateUrl: './stock-detail-list.component.html',
  styleUrls: ['./stock-detail-list.component.css']
})
export class StockDetailListComponent implements OnInit {

  private tradingPalRestClient: TradingPalRestClient;
  private stocksToBuy: StocksToTrade = new StocksToTrade();
  private stocksToSell: StocksToTrade = new StocksToTrade();
  private transactions: Transactions[];
  private timeoutCounter = 100;
  private timeoutNormalIntervalSec = 30;
  private lastUpdateVersionBuy = 0;

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
        this.getStocksTransacted();
      } else {
        this.timeoutCounter ++;
      }
    } catch (e) {
      console.log('Error when getting stocks to sell or buy: ', e);
    } finally {
      setTimeout(this.timeOutCallback.bind(this),  1000);
    }
  }

  getStocksTransacted() {
    this.tradingPalRestClient.getTransactions().subscribe(retData => {
      this.transactions = retData.retval.reverse();
    });
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
