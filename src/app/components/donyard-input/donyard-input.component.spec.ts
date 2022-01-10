import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonyardInputComponent } from './donyard-input.component';

describe('DonyardInputComponent', () => {
  let component: DonyardInputComponent;
  let fixture: ComponentFixture<DonyardInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DonyardInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DonyardInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
