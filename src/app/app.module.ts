import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { StockDetailsComponent } from './stock-details/stock-details.component';
import { StockDetailListComponent } from './stock-detail-list/stock-detail-list.component';

@NgModule({
  declarations: [
    AppComponent,
    StockDetailsComponent,
    StockDetailListComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
