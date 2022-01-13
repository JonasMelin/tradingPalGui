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

  avanzaKillSwitch() {
    console.log('Avanza Kill switch!!')
    this.tradingPalRestClient.avanzaKillSwitch().subscribe(retData => {
      console.log("kill switch OK")
    });
  }

  avanzaBlockPurchases() {
    console.log('Avanza block purchases!!')
    this.tradingPalRestClient.avanzaBlockPurchase().subscribe(retData => {
      console.log("block purchases OK")
    });
  }

  avanzaUnblockPurchases() {
    console.log('Avanza un-block purchases!!')
    this.tradingPalRestClient.avanzaUnblockPurchase().subscribe(retData => {
      console.log("un-block purchases OK")
    });
  }
}
