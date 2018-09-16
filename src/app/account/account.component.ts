import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { AccountService } from './account.service';
import * as fromAccount from './account.reducer';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  // TODO - Ongoing should be a list of Accounts not just one
  ongoingAccount$: Observable<boolean>;

  constructor(private accountService: AccountService, private store: Store<fromAccount.State>) { }

  ngOnInit() {
    this.ongoingAccount$ = this.store.select(fromAccount.getIsAccount)
  }
}
