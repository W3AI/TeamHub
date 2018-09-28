import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DnaControlComponent } from './dna-control.component';

describe('DnaControlComponent', () => {
  let component: DnaControlComponent;
  let fixture: ComponentFixture<DnaControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DnaControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DnaControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
