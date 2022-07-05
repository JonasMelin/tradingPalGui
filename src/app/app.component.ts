import { Message } from '@angular/compiler/src/i18n/i18n_ast';
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

  addPutinSekToMongo() {

    const additionalPutinSekElement = document.getElementById('addfunds') as HTMLInputElement | null;
    let additionalPutinSek: number = +(additionalPutinSekElement.value);

    if (additionalPutinSek == null || Number.isNaN(additionalPutinSek) || additionalPutinSek == 0) {
      alert("Bad format. Use positive or negative integers, not 0")
      return
    }

    if (additionalPutinSek > 10000 || additionalPutinSek < -10000) {
      alert("Value out of range. Use -10000 < x < 10000")
      return
    }

    console.log('addPutinSekToMongo... ' + additionalPutinSek) 

    this.tradingPalRestClient.addPutinSekToMongo(additionalPutinSek).subscribe(retData => {
      console.log("Added funds " + additionalPutinSek)
      alert("Added funds: " + additionalPutinSek + " (SEK)")
    });
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
