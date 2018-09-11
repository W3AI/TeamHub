import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFriendComponent } from './list-friend.component';

describe('ListFriendComponent', () => {
  let component: ListFriendComponent;
  let fixture: ComponentFixture<ListFriendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListFriendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListFriendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
