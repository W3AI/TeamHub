import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DnaProblemComponent } from './dna-problem.component';

describe('DnaProblemComponent', () => {
  let component: DnaProblemComponent;
  let fixture: ComponentFixture<DnaProblemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DnaProblemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DnaProblemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
