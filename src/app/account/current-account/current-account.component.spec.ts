import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentAccountComponent } from './current-account.component';

describe('CurrentAccountComponent', () => {
  let component: CurrentAccountComponent;
  let fixture: ComponentFixture<CurrentAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
