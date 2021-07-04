import { Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class TradingPalRestClient {
  constructor(private httpClient: HttpClient) {
  }
  getData(): Observable<any> {
    return this.httpClient.get('api/tradingpal/getStocksToSell');
  }
}

