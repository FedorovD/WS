import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondCaseComponent } from './second-case.component';

describe('SecondCaseComponent', () => {
  let component: SecondCaseComponent;
  let fixture: ComponentFixture<SecondCaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecondCaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecondCaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
