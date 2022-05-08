import { Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {LockFileData} from '../model/LockFileData';
import {UnlockFileData} from '../model/UnlockFileData';
import {SubmitStockUpdate} from '../model/SubmitStockUpdate';

@Injectable()
export class TradingPalRestClient {
  constructor(private httpClient: HttpClient) {
  }

  avanzaKillSwitch(): Observable<any> {
    return this.httpClient.get('avanza/tradingpalavanza/killswitch');
  }

  avanzaBlockPurchase(): Observable<any> {
    return this.httpClient.get('avanza/tradingpalavanza/blockpurchases');
  }

  avanzaUnblockPurchase(): Observable<any> {
    return this.httpClient.get('avanza/tradingpalavanza/unblockpurchases');
  }

  getDailyMetrics(): Observable<any> {
    return this.httpClient.get('storage/tradingpalstorage/getDailyMetrics');
  }

  getSuperscore2(): Observable<any> {
    return this.httpClient.get('storage/tradingpalstorage/getSuperscore2');
  }

  getTpIndex(): Observable<any> {
    return this.httpClient.get('storage/tradingpalstorage/getTpIndex');
  }

  getDevelopmentSinceStart(): Observable<any> {
    return this.httpClient.get('storage/tradingpalstorage/getDevelopmentSinceStart');
  }

  getDevelopment(daysBack: number): Observable<any> {
    return this.httpClient.get('storage/tradingpalstorage/getDevelopmentSinceDaysBack?daysback=' + daysBack);
  }

  getTurnover(daysBack: number): Observable<any> {
    return this.httpClient.get('storage/tradingpalstorage/getTurnoverLastDays?daysback=' + daysBack);
  }

  getTransactions(daysBack: number): Observable<any> {
    return this.httpClient.get('storage/tradingpalstorage/getTransactionsLastDays?daysback=' + daysBack);
  }

  getStocksToSell(): Observable<any> {
    return this.httpClient.get('api/tradingpal/getStocksToSell');
  }

  getAllStocks(): Observable<any> {
    return this.httpClient.get('api/tradingpal/getAllStocks');
  }

  getStocksToBuy(): Observable<any> {
    return this.httpClient.get('api/tradingpal/getStocksToBuy');
  }

  forceRefresh(): Observable<any> {
    return this.httpClient.put('api/tradingpal/refresh', null);
  }

  lockStock(ticker: string): Observable<any>  {
    const body = new LockFileData();
    body.ticker = ticker;
    return this.httpClient.post('api/tradingpal/lock', body);
  }

  unLockStock(ticker: string, lockKey: number) {
    const body = new UnlockFileData();
    body.ticker = ticker;
    body.lockKey = lockKey;
    return this.httpClient.post('api/tradingpal/unlock', body).subscribe();
  }

  updateStock(submitStockUpdate: SubmitStockUpdate): Observable<any> {
    return this.httpClient.post('api/tradingpal/updateStock', submitStockUpdate);
  }
}

