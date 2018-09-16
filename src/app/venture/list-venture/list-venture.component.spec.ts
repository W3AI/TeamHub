import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListVentureComponent } from './list-venture.component';

describe('ListVentureComponent', () => {
  let component: ListVentureComponent;
  let fixture: ComponentFixture<ListVentureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListVentureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListVentureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
