import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RcaFormComponent } from './rca-form.component';

describe('RcaFormComponent', () => {
  let component: RcaFormComponent;
  let fixture: ComponentFixture<RcaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RcaFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RcaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
