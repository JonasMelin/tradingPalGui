
import {StockTradeInfo} from './StockTradeInfo';

export class StocksToTrade {
  updateVersion: number;
  failCounter: number;
  successCounter: number;
  skippedCounter: number;
  buyModeStocks: number;
  neutralModeStocks: number;
  sellModeStocks: number;
  totalGlobalValueSek: number;
  totalInvestedSek: number;
  updatedUtc: string;
  list: StockTradeInfo[];
}
