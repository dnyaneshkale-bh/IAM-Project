import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardRCAComponent } from './card-rca.component';

describe('CardRCAComponent', () => {
  let component: CardRCAComponent;
  let fixture: ComponentFixture<CardRCAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardRCAComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardRCAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
