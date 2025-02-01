import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShalwarKameezComponent } from './shalwar-kameez.component';

describe('ShalwarKameezComponent', () => {
  let component: ShalwarKameezComponent;
  let fixture: ComponentFixture<ShalwarKameezComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShalwarKameezComponent]
    });
    fixture = TestBed.createComponent(ShalwarKameezComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
