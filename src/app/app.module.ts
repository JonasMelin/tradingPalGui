import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { StockDetailsComponent } from './stock-details/stock-details.component';
import { StockDetailListComponent } from './stock-detail-list/stock-detail-list.component';
import { HttpClientModule} from '@angular/common/http';
import {TradingPalRestClient} from './service/tradingPalRestClient';


@NgModule({
  declarations: [
    AppComponent,
    StockDetailsComponent,
    StockDetailListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
  ],
  providers: [TradingPalRestClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
