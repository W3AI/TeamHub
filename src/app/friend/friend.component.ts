import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { FriendService } from './friend.service';
import * as fromFriend from './friend.reducer';

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.css']
})
export class FriendComponent implements OnInit {

  friend$: Observable<boolean>;

  constructor(private skillService: FriendService, private store: Store<fromFriend.State>) { }

  ngOnInit() {
    this.friend$ = this.store.select(fromFriend.getIsFriend)
  }
}
