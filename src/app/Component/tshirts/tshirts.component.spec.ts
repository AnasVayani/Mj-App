import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TshirtsComponent } from './tshirts.component';

describe('TshirtsComponent', () => {
  let component: TshirtsComponent;
  let fixture: ComponentFixture<TshirtsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TshirtsComponent]
    });
    fixture = TestBed.createComponent(TshirtsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
