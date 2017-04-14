import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslateWordComponent } from './translate-word.component';

describe('TranslateWordComponent', () => {
  let component: TranslateWordComponent;
  let fixture: ComponentFixture<TranslateWordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TranslateWordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TranslateWordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
