import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PastVentureComponent } from './past-venture.component';

describe('PastVentureComponent', () => {
  let component: PastVentureComponent;
  let fixture: ComponentFixture<PastVentureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PastVentureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PastVentureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
