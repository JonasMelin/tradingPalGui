import { Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

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
}

