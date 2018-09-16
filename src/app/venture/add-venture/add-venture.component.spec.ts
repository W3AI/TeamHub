import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVentureComponent } from './add-venture.component';

describe('AddVentureComponent', () => {
  let component: AddVentureComponent;
  let fixture: ComponentFixture<AddVentureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddVentureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddVentureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
