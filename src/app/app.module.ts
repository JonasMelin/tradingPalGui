import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { StockDetailsComponent } from './stock-details/stock-details.component';
import { StockDetailListComponent } from './stock-detail-list/stock-detail-list.component';
import { HttpClientModule} from '@angular/common/http';
import {TradingPalRestClient} from './service/tradingPalRestClient';
import { StockAllListComponent } from './stock-all-list/stock-all-list.component';
import { TransactionDetailComponent } from './transaction-detail/transaction-detail.component';
import { TurnoverDetailComponent } from './turnover-detail/turnover-detail.component';
import { ZingchartAngularModule } from 'zingchart-angular';

@NgModule({
  declarations: [
    AppComponent,
    StockDetailsComponent,
    StockDetailListComponent,
    StockAllListComponent,
    TransactionDetailComponent,
    TurnoverDetailComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ZingchartAngularModule
  ],
  providers: [TradingPalRestClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
