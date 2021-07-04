import {Component, Input, OnInit} from '@angular/core';
import {StockTradeInfo} from '../model/StockTradeInfo';

@Component({
  selector: 'app-stock-details',
  templateUrl: './stock-details.component.html',
  styleUrls: ['./stock-details.component.css']
})
export class StockDetailsComponent implements OnInit {
  @Input() currancy: string;
  @Input() numberToSell: number;
  @Input() numberToBuy: number;
  @Input() priceOrigCurrancy: number;
  @Input() singleStockPriceSek: number;
  @Input() tickerName: string;
  @Input() boughtAt: number;
  @Input() currentCount: number;
  @Input() name: string;
  @Input() soldAt: number;
  @Input() tickerIsLocked: boolean;
  @Input() totalInvestedSek: number;
  currentValueSek: number;
  sellValueSek: number;
  buyValueSek: number;
  constructor() {
  }

  ngOnInit() {
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
}
