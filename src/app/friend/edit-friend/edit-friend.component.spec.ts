import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFriendComponent } from './edit-friend.component';

describe('EditFriendComponent', () => {
  let component: EditFriendComponent;
  let fixture: ComponentFixture<EditFriendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditFriendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFriendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
