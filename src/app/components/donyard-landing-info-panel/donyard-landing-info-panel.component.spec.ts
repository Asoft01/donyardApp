import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonyardLandingInfoPanelComponent } from './donyard-landing-info-panel.component';

describe('DonyardLandingInfoPanelComponent', () => {
  let component: DonyardLandingInfoPanelComponent;
  let fixture: ComponentFixture<DonyardLandingInfoPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DonyardLandingInfoPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DonyardLandingInfoPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
