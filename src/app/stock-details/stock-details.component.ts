import {Component, Input, OnInit} from '@angular/core';
import {StockTradeInfo} from '../model/StockTradeInfo';
import {TradingPalRestClient} from '../service/tradingPalRestClient';
import {LockResponse} from '../model/LockResponse';

@Component({
  selector: 'app-stock-details',
  templateUrl: './stock-details.component.html',
  styleUrls: ['./stock-details.component.css']
})
export class StockDetailsComponent implements OnInit {
  @Input() private currancy: string;
  @Input() private numberToSell: number;
  @Input() private numberToBuy: number;
  @Input() private priceOrigCurrancy: number;
  @Input() private singleStockPriceSek: number;
  @Input() private tickerName: string;
  @Input() private boughtAt: number;
  @Input() private currentCount: number;
  @Input() private name: string;
  @Input() private soldAt: number;
  @Input() private tickerIsLocked: string;
  @Input() private totalInvestedSek: number;
  private currentValueSek: number;
  private sellValueSek: number;
  private buyValueSek: number;
  private tradingPalRestClient: TradingPalRestClient;
  private lockResponse: LockResponse = null;
  private submittingChanges = false;
  private lockingStock = false;
  private possibleToLock = true;
  private lockedBySomeoneElse = false;

  constructor(private restClient: TradingPalRestClient) {
    this.tradingPalRestClient = restClient;
  }

  ngOnInit() {

    if (this.tickerName in window['tradingpaldata']['lockKeys'] && window['tradingpaldata']['lockKeys'][this.tickerName] != null) {
      this.lockResponse = window['tradingpaldata']['lockKeys'][this.tickerName];
    }

    this.possibleToLock = this.tickerIsLocked === 'false' && this.lockResponse == null;
    this.lockedBySomeoneElse = this.tickerIsLocked === 'true' && this.lockResponse == null;

    this.currentValueSek = Math.floor(this.currentCount * this.singleStockPriceSek);
    if (this.numberToSell) {
      this.sellValueSek = Math.floor(this.numberToSell * this.singleStockPriceSek);
    }
    if (this.numberToBuy) {
      this.buyValueSek = Math.floor(this.numberToBuy * this.singleStockPriceSek);
    }
    this.singleStockPriceSek = Math.floor(this.singleStockPriceSek);
    this.priceOrigCurrancy = Math.floor(this.priceOrigCurrancy);
  }

  lockStock() {
    this.lockingStock = true;
    this.possibleToLock = false;
    console.log('Locking stock ', this.tickerName);
    this.tradingPalRestClient.lockStock(this.tickerName).subscribe( retData => {
      window['tradingpaldata']['lockKeys'][this.tickerName] = retData
      this.lockResponse = retData;
    });
  }

  submitChangesAndUnlock() {
    console.log('Submitting changes ', this.tickerName);
    this.tradingPalRestClient.unLockStock(this.tickerName, this.lockResponse.lockKey);
    window['tradingpaldata']['lockKeys'][this.tickerName] = null;
    this.lockResponse = null;
    this.submittingChanges = true;
  }
}
