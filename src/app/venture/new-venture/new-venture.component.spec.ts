import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewVentureComponent } from './new-venture.component';

describe('NewVentureComponent', () => {
  let component: NewVentureComponent;
  let fixture: ComponentFixture<NewVentureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewVentureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewVentureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
