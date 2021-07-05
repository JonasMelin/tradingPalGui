import { Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {LockFileData} from '../model/LockFileData';
import {UnlockFileData} from '../model/UnlockFileData';

@Injectable()
export class TradingPalRestClient {
  constructor(private httpClient: HttpClient) {
  }

  getStocksToSell(): Observable<any> {
    return this.httpClient.get('api/tradingpal/getStocksToSell');
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
}

