import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { FriendService } from '../friend.service';
import { Relation } from '../relation.model';
import { Invite } from '../invite.model';
import { Operation } from '../operation.model';
import { Problem } from '../problem.model';
import { UIService } from '../../shared/ui.service';
import * as fromFriend from '../friend.reducer';
import * as fromRoot from '../../app.reducer';

@Component({
  selector: 'app-add-friend',
  templateUrl: './add-friend.component.html',
  styleUrls: ['./add-friend.component.css']
})
export class AddFriendComponent implements OnInit {
  relations$: Observable<Relation[]>;
  panelOpenState = false;
  defaultName = 'Stephen Hawking';
  defaultEmail = 'Stephen.Hawking@w3ai.net';
  defaultProjects = 'Add here your friend shared projects';
  defaultServices = 'Add here your friend shared services';
  defaultInterests = 'universe, time, physics';
  defaultDescription = 'How you met, connected, learned about';
  defaultUrl = 'https://teamhub.w3ai.net/stephen-hawking/';
  // isLoading$: Observable<boolean>;

  constructor(
    private friendService: FriendService, 
    private uiService:  UIService, 
    private store: Store<fromFriend.State>  
  ) {}

  ngOnInit() {
    // this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    // this.plans$ = this.store.select(fromProject.getAvailablePlans);
    // this.fetchPlans();  
  }

  onAddFriend(form: NgForm) {
    this.friendService.addFriend( form.value );
  }

  // onInviteFriend(form: NgForm) {
  //   this.friendService.inviteFriend( form.value );
  // }

}
