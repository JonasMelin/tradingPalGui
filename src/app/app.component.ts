import { Component } from '@angular/core';
import {TradingPalRestClient} from './service/tradingPalRestClient';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TradingPal Management GUI';

  private refreshButtonDisabled = false;

  tradingPalRestClient: TradingPalRestClient;

  constructor(private restClient: TradingPalRestClient) {
    window['tradingpaldata'] = {};
    window['tradingpaldata']['fastRefresh'] = false;
    this.tradingPalRestClient = restClient;
  }

  forceRefresh() {
    console.log('Force refresh...')
    this.refreshButtonDisabled = true;
    this.tradingPalRestClient.forceRefresh().subscribe(retData => {
      setTimeout(() => { this.refreshButtonDisabled = false; }, 1000);
    });
  }
}
