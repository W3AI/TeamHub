import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProSessionComponent } from './pro-session.component';

describe('ProSessionComponent', () => {
  let component: ProSessionComponent;
  let fixture: ComponentFixture<ProSessionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProSessionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
