import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstCaseComponent } from './first-case.component';

describe('FirstCaseComponent', () => {
  let component: FirstCaseComponent;
  let fixture: ComponentFixture<FirstCaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirstCaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstCaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
