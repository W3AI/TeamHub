import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DnaOperationComponent } from './dna-operation.component';

describe('DnaOperationComponent', () => {
  let component: DnaOperationComponent;
  let fixture: ComponentFixture<DnaOperationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DnaOperationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DnaOperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
