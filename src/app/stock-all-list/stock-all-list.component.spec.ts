import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockAllListComponent } from './stock-all-list.component';

describe('StockAllListComponent', () => {
  let component: StockAllListComponent;
  let fixture: ComponentFixture<StockAllListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockAllListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockAllListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
