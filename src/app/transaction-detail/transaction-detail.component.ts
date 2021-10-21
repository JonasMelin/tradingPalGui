import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-transaction-detail',
  templateUrl: './transaction-detail.component.html',
  styleUrls: ['./transaction-detail.component.css']
})
export class TransactionDetailComponent implements OnInit {

  @Input() private name: string;
  @Input() private date: string;
  @Input() private boughtAt: number;
  @Input() private count: number;
  @Input() private currency: string;
  @Input() private soldAt: number;
  @Input() private totalInvestedSek: number;
  @Input() private purchasedStocks: number;
  @Input() private purchaseValueSek: number;
  @Input() private tradedByBot: boolean;

  constructor() {

  }

  ngOnInit() {
    console.log(this.purchaseValueSek);
  }

}
