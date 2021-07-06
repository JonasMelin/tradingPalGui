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
  private cancelling = false;
  private lockingStock = false;
  private possibleToLock = true;
  private possibleToSubmit = false;
  private lockedBySomeoneElse = false;
  private lockStatusText: string = null;

  constructor(private restClient: TradingPalRestClient) {
    this.tradingPalRestClient = restClient;
  }

  ngOnInit() {
    this.updateFlags();

    this.currentValueSek = this.currentCount * this.singleStockPriceSek;
    if (this.numberToSell) {
      this.sellValueSek = this.numberToSell * this.singleStockPriceSek;
    }
    if (this.numberToBuy) {
      this.buyValueSek = this.numberToBuy * this.singleStockPriceSek;
    }
    this.singleStockPriceSek = this.singleStockPriceSek;
    this.priceOrigCurrancy = this.priceOrigCurrancy;
  }

  updateFlags() {
    if (this.tickerName in window['tradingpaldata']['lockKeys'] && window['tradingpaldata']['lockKeys'][this.tickerName] != null) {
      this.lockResponse = window['tradingpaldata']['lockKeys'][this.tickerName];
    } else {
      this.lockResponse = null;
    }
    this.possibleToSubmit = this.tickerIsLocked === 'true' && this.lockResponse != null;
    this.possibleToLock = this.tickerIsLocked === 'false' && this.lockResponse == null;
    this.lockedBySomeoneElse = this.tickerIsLocked === 'true' && this.lockResponse == null;
    this.lockStatusText = null;
    if (this.lockingStock) {
      this.lockStatusText = 'Locking stock and refreshing...';
    } else if (this.cancelling) {
      this.lockStatusText = 'Cancelling...';
    } else if (this.submittingChanges) {
      this.lockStatusText = 'Submitting changes and refreshing...';
    } else if (this.lockedBySomeoneElse) {
      this.lockStatusText = 'Stock is locked by someone else...';
    }
  }

  lockStock() {
    this.lockingStock = true;
    this.updateFlags();
    console.log('Locking stock ', this.tickerName);
    this.tradingPalRestClient.lockStock(this.tickerName).subscribe( retData => {
      window['tradingpaldata']['lockKeys'][this.tickerName] = retData
      this.updateFlags();
    });
  }

  cancelLock() {
    console.log('Cancel changes ', this.tickerName);
    this.tradingPalRestClient.unLockStock(this.tickerName, this.lockResponse.lockKey);
    window['tradingpaldata']['lockKeys'][this.tickerName] = null;
    this.cancelling = true;
    this.updateFlags();
  }
}
