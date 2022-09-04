import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RcaInformationComponent } from './rca-information.component';

describe('RcaInformationComponent', () => {
  let component: RcaInformationComponent;
  let fixture: ComponentFixture<RcaInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RcaInformationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RcaInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
