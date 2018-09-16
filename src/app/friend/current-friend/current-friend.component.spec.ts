import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentFriendComponent } from './current-friend.component';

describe('CurrentFriendComponent', () => {
  let component: CurrentFriendComponent;
  let fixture: ComponentFixture<CurrentFriendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentFriendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentFriendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
