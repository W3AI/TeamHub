import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentSessionComponent } from './current-session.component';

describe('CurrentSessionComponent', () => {
  let component: CurrentSessionComponent;
  let fixture: ComponentFixture<CurrentSessionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentSessionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
