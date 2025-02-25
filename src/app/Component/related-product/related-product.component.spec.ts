import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatedProductComponent } from './related-product.component';

describe('RelatedProductComponent', () => {
  let component: RelatedProductComponent;
  let fixture: ComponentFixture<RelatedProductComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RelatedProductComponent]
    });
    fixture = TestBed.createComponent(RelatedProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
