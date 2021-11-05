import { Component, OnInit } from '@angular/core';
import { TradingPalRestClient } from '../service/tradingPalRestClient';
import { StocksToTrade } from '../model/StocksToTrade';
import {Transactions} from '../model/Transactions';
import {Turnover} from '../model/Turnover';

@Component({
  selector: 'app-stock-detail-list',
  templateUrl: './stock-detail-list.component.html',
  styleUrls: ['./stock-detail-list.component.css']
})
export class StockDetailListComponent implements OnInit {

  private tradingPalRestClient: TradingPalRestClient;
  private stocksToBuy: StocksToTrade = new StocksToTrade();
  private stocksToSell: StocksToTrade = new StocksToTrade();
  public transactionsToday: Transactions[] = [];
  public transactionsYesterday: Transactions[] = [];
  private turnoverToday: Turnover;
  private turnoverWeek: Turnover;
  private turnoverMonth: Turnover;
  private developmentToday = 0.0;
  private developmentTodayTrend = 0;
  private developmentSinceStart = 0;
  private developmentSinceStartTrend = 0;
  private tpIndex = 0.0;
  private tpIndexTrend = 0;
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
        this.getStocksTransactedToday();
        this.getStocksTransactedYesterday();
        this.getTurnOverToday();
        this.getTurnOverWeek();
        this.getTurnOverMonth();
        this.getDevelopmentToday();
        this.getDevelopmentSinceStart();
        this.getTpIndex();
      } else {
        this.timeoutCounter ++;
      }
    } catch (e) {
      console.log('Error when getting stocks to sell or buy: ', e);
    } finally {
      setTimeout(this.timeOutCallback.bind(this),  1000);
    }
  }

  getTpIndex() {
    this.tradingPalRestClient.getTpIndex().subscribe(retData => {
      this.tpIndex = retData.retval;
      this.tpIndexTrend = retData.trend;
    });
  }

  getDevelopmentSinceStart() {
    this.tradingPalRestClient.getDevelopmentSinceStart().subscribe(retData => {
      this.developmentSinceStart = retData.retval;
      this.developmentSinceStartTrend = retData.trend;
    });
  }

  getDevelopmentToday() {
    this.tradingPalRestClient.getDevelopment(1).subscribe(retData => {
      this.developmentToday = retData.retval;
      this.developmentTodayTrend = retData.trend;
    });
  }

  getTurnOverToday() {
    this.tradingPalRestClient.getTurnover(0).subscribe(retData => {
      this.turnoverToday = retData.retval;
    });
  }

  getTurnOverWeek() {
    this.tradingPalRestClient.getTurnover(7).subscribe(retData => {
      this.turnoverWeek = retData.retval;
    });
  }

  getTurnOverMonth() {
    this.tradingPalRestClient.getTurnover(31).subscribe(retData => {
      this.turnoverMonth = retData.retval;
    });
  }

  getStocksTransactedToday() {
    this.tradingPalRestClient.getTransactions(0).subscribe(retData => {
      this.transactionsToday = retData.retval.reverse();
    });
  }

  getStocksTransactedYesterday() {
    this.tradingPalRestClient.getTransactions(1).subscribe(retData => {
      this.transactionsYesterday = retData.retval.reverse();
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
