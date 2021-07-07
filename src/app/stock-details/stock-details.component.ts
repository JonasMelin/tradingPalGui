import {Component, Input, OnInit} from '@angular/core';
import {StockTradeInfo} from '../model/StockTradeInfo';
import {TradingPalRestClient} from '../service/tradingPalRestClient';
import {LockResponse} from '../model/LockResponse';
import {SubmitStockUpdate} from '../model/SubmitStockUpdate';

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

  submitChanges() {
    let soldAt = 0;
    let boughtAt = 0;
    const stockCount: number = +(<HTMLInputElement>document.getElementById(this.tickerName + '_form_count'))
      .value.replace(',', '');
    const totInvest: number = +(<HTMLInputElement>document.getElementById(this.tickerName + '_form_totinvest'))
      .value.replace(',', '');
    try {
      soldAt = +(<HTMLInputElement> document.getElementById(this.tickerName + '_form_soldat'))
        .value.replace(',', '');
    } catch (e) {}
    try {
      boughtAt = +(<HTMLInputElement> document.getElementById(this.tickerName + '_form_boughtat'))
        .value.replace(',', '');
    } catch (e) {}

    const submitData = this.validateTextFields(soldAt, boughtAt, stockCount, totInvest);

    if (submitData != null) {
      window['tradingpaldata']['lockKeys'][this.tickerName] = null;
      this.lockResponse = null;
      this.tradingPalRestClient.updateStock(submitData).subscribe(retData => {
        console.log('Submitted updates OK!');
      });
    }
    console.log('Submitting data: ', submitData);
  }

  validateTextFields(soldAt: number, boughtAt: number, stockCount: number, totInvest: number): SubmitStockUpdate {

    const submitData = new SubmitStockUpdate();
    submitData.lockKey = this.lockResponse.lockKey;
    submitData.ticker = this.tickerName;

    if (soldAt !== 0 && boughtAt !== 0) {
      alert('you cannot provide both soldAt and boughtAt values');
      return null;
    }

    if (isNaN(soldAt)) {
      alert('Illegal soldAt value. Provide a number!');
      return null;
    }
    if (isNaN(boughtAt)) {
      alert('Illegal boughtAt value. Provide a number!');
      return null;
    }
    if (isNaN(stockCount)) {
      alert('Illegal stockCount value. Provide a number!');
      return null;
    }
    if (isNaN(totInvest)) {
      alert('Illegal totInvest value. Provide a number!');
      return null;
    }

    submitData.soldAt = soldAt !== 0 ? soldAt : null;
    submitData.boughtAt = boughtAt !== 0 ? boughtAt : null;
    submitData.count = Math.floor(stockCount);
    submitData.totalInvestedSek = Math.floor(totInvest);

    if (!(submitData.count > 0 && submitData.count < 100000)) {
      alert('Illegal stock count value: ' + submitData.count);
      return null;
    }

    if (!(submitData.totalInvestedSek > 0 && submitData.totalInvestedSek < 1000000)){
      alert('Illegal total invested value: ' + submitData.totalInvestedSek);
    }
    return submitData;
  }
}
