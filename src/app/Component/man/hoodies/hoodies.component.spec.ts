import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HoodiesComponent } from './hoodies.component';

describe('HoodiesComponent', () => {
  let component: HoodiesComponent;
  let fixture: ComponentFixture<HoodiesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HoodiesComponent]
    });
    fixture = TestBed.createComponent(HoodiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
