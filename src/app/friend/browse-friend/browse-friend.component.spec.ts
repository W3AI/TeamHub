import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseFriendComponent } from './browse-friend.component';

describe('BrowseFriendComponent', () => {
  let component: BrowseFriendComponent;
  let fixture: ComponentFixture<BrowseFriendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrowseFriendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowseFriendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
