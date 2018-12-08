import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OohAdsComponent } from './ooh-ads.component';

describe('OohAdsComponent', () => {
  let component: OohAdsComponent;
  let fixture: ComponentFixture<OohAdsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OohAdsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OohAdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
