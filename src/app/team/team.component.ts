import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { TeamService } from './team.service';
import * as fromTeam from './team.reducer';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  // TODO - Ongoing should be a list of Players not just one
  ongoingTeam$: Observable<boolean>;

  constructor(private teamService: TeamService, private store: Store<fromTeam.State>) { }

  ngOnInit() {  
    // TODO - to Refactor to ongoingInvites - to join collaboration / contribution to team / project / venture activities
    this.ongoingTeam$ = this.store.select(fromTeam.getIsPlayer)
  }
}
