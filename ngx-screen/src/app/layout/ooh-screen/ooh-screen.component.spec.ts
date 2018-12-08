import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OohScreenComponent } from './ooh-screen.component';

describe('OohScreenComponent', () => {
  let component: OohScreenComponent;
  let fixture: ComponentFixture<OohScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OohScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OohScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
