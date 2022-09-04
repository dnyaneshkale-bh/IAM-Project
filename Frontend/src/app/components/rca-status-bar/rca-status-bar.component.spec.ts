import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RcaStatusBarComponent } from './rca-status-bar.component';

describe('RcaStatusBarComponent', () => {
  let component: RcaStatusBarComponent;
  let fixture: ComponentFixture<RcaStatusBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RcaStatusBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RcaStatusBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
