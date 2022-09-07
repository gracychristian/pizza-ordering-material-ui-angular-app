import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PizzaContentComponent } from './pizza-content.component';

describe('PizzaContentComponent', () => {
  let component: PizzaContentComponent;
  let fixture: ComponentFixture<PizzaContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PizzaContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PizzaContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
