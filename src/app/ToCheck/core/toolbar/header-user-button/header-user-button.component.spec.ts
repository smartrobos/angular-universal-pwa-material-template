import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderUserButtonComponent } from './header-user-button.component';

describe('HeaderUserButtonComponent', () => {
  let component: HeaderUserButtonComponent;
  let fixture: ComponentFixture<HeaderUserButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderUserButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderUserButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
