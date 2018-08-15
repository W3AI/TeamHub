import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PastProjectComponent } from './past-project.component';

describe('PastProjectComponent', () => {
  let component: PastProjectComponent;
  let fixture: ComponentFixture<PastProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PastProjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PastProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
