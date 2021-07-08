
import {StockTradeInfo} from './StockTradeInfo';

export class StocksToTrade {
  updateVersion: number;
  failCounter: number;
  successCounter: number;
  totalGlobalValueSek: number;
  totalInvestedSek: number;
  updatedUtc: string;
  list: StockTradeInfo[];
}
