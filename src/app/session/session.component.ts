import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { SessionService } from './session.service';
import * as fromSession from './session.reducer';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.css']
})
export class SessionComponent implements OnInit {

  ongoingSession$: Observable<boolean>;

  constructor(private skillService: SessionService, private store: Store<fromSession.State>) { }

  ngOnInit() {
    this.ongoingSession$ = this.store.select(fromSession.getIsSession)
  }
}
