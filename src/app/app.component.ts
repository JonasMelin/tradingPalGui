import { Component } from '@angular/core';
import {TradingPalRestClient} from './service/tradingPalRestClient';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TradingPal Management GUI';

  tradingPalRestClient: TradingPalRestClient;

  constructor(private restClient: TradingPalRestClient) {
    window['tradingpaldata'] = {};
    window['tradingpaldata']['lockKeys'] = {};
    this.tradingPalRestClient = restClient;
  }

  forceRefresh() {
    console.log('Force refresh...')
    this.tradingPalRestClient.forceRefresh();
  }
}
