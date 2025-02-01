import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnstitchedFabricComponent } from './unstitched-fabric.component';

describe('UnstitchedFabricComponent', () => {
  let component: UnstitchedFabricComponent;
  let fixture: ComponentFixture<UnstitchedFabricComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UnstitchedFabricComponent]
    });
    fixture = TestBed.createComponent(UnstitchedFabricComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
