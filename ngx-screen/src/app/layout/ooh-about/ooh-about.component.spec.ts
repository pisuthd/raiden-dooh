import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OohAboutComponent } from './ooh-about.component';

describe('OohAboutComponent', () => {
  let component: OohAboutComponent;
  let fixture: ComponentFixture<OohAboutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OohAboutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OohAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
