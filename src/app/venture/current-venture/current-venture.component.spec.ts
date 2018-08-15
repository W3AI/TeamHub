import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentVentureComponent } from './current-venture.component';

describe('CurrentVentureComponent', () => {
  let component: CurrentVentureComponent;
  let fixture: ComponentFixture<CurrentVentureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentVentureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentVentureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
