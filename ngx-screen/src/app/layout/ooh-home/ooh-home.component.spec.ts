import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OohHomeComponent } from './ooh-home.component';

describe('OohHomeComponent', () => {
  let component: OohHomeComponent;
  let fixture: ComponentFixture<OohHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OohHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OohHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
