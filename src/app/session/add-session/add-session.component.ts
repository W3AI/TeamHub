import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { SessionService } from '../session.service';
import { Relation } from '../relation.model';
import { Invite } from '../invite.model';
import { Operation } from '../operation.model';
import { Problem } from '../problem.model';
import { UIService } from '../../shared/ui.service';
import * as fromSession from '../session.reducer';
import * as fromRoot from '../../app.reducer';

@Component({
  selector: 'app-add-session',
  templateUrl: './add-session.component.html',
  styleUrls: ['./add-session.component.css']
})
export class AddSessionComponent implements OnInit {
  relations$: Observable<Relation[]>;
  panelOpenState = false;
  defaultName = 'International Education Project Kickoff';
  defaultEmail = 'GIT@w3ai.net';
  defaultProjects = 'Intl Edu Project';
  defaultServices = 'NS, ON, NY Edu';
  defaultInterests = 'fast, social, innovation, student, teams';
  defaultConsole = `GIT(master)$> nt generate venture Edu
GIT(master)$> venture Edu created
GIT(master)$> nt generate skills Edu
GIT(master)$> skills Edu created
GIT(master)$> nt generate teams Edu
GIT(master)$> teams Edu created
GIT(master)$> nt generate project Edu
GIT(master)$> project Edu created
GIT(master)$>
  `;
  defaultUrl = 'https://nteams.w3ai.net/GIT/';
  // isLoading$: Observable<boolean>;

  constructor(
    private sessionService: SessionService, 
    private uiService:  UIService, 
    private store: Store<fromSession.State>  
  ) {}

  ngOnInit() {
    // this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    // this.plans$ = this.store.select(fromProject.getAvailablePlans);
    // this.fetchPlans();  
  }

  onAddSession(form: NgForm) {
    this.sessionService.addSession( form.value );
  }

  // onInviteSession(form: NgForm) {
  //   this.sessionService.inviteSession( form.value );
  // }

}
