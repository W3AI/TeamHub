import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentAccountsComponent } from './current-accounts.component';

describe('CurrentAccountsComponent', () => {
  let component: CurrentAccountsComponent;
  let fixture: ComponentFixture<CurrentAccountsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentAccountsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
