import {StockCurrentData} from './StockCurrentData';

export class StockTradeInfo {
  currancy: string;
  numberToSell: number;
  numberToBuy: number;
  priceOrigCurrancy: number;
​​  singleStockPriceSek: number;
​​  tickerName: string;
  currentStock: StockCurrentData;
​​
}
