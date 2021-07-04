import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockDetailListComponent } from './stock-detail-list.component';

describe('StockDetailListComponent', () => {
  let component: StockDetailListComponent;
  let fixture: ComponentFixture<StockDetailListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockDetailListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockDetailListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
