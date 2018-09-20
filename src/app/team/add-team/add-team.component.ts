import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { TeamService } from '../team.service';
import { Group } from '../group.model';
import { UIService } from '../../shared/ui.service';
import * as fromTeam from '../team.reducer';
import * as fromRoot from '../../app.reducer';

// TODO - Refactor on Team / Invites / Command execution

@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.component.html',
  styleUrls: ['./add-team.component.css']
})
export class AddTeamComponent implements OnInit {
  groups$: Observable<Group[]>;
  panelOpenState = false;
  // TODO - to uncomment is Loading !!!
  isLoading$: Observable<boolean>;

  constructor(
    private teamService: TeamService, 
    private uiService:  UIService, 
    private store: Store<fromTeam.State>   
  ) {}

  ngOnInit() {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    // TODO - This might be needed on List Teams
    // this.groups$ = this.store.select(fromTeam.getAvailableTeams);
    // this.fetchTeams();  
  }

  onAddTeam(form: NgForm) {
    this.teamService.addTeam( form.value );
  }

  // onSubmit(form: NgForm) {
  //   console.log(form);
  // }

}
