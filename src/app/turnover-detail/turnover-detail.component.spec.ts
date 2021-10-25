import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnoverDetailComponent } from './turnover-detail.component';

describe('TurnoverDetailComponent', () => {
  let component: TurnoverDetailComponent;
  let fixture: ComponentFixture<TurnoverDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TurnoverDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TurnoverDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
