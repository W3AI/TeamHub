import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { AccountService } from '../account.service';
import { Bank } from '../bank.model';
import { UIService } from '../../shared/ui.service';
import * as fromAccount from '../account.reducer';
import * as fromRoot from '../../app.reducer';

// TODO - Refactoring on Account ~? Bank / Card / transaction

@Component({
  selector: 'app-add-account',
  templateUrl: './add-account.component.html',
  styleUrls: ['./add-account.component.css']
})
export class AddAccountComponent implements OnInit {
  banks$: Observable<Bank[]>;
  // isLoading$: Observable<boolean>;
  
  constructor(
    private accountService: AccountService, 
    private uiService:  UIService, 
    private store: Store<fromAccount.State> 
  ) {}

  ngOnInit() {
    // this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    // this.plans$ = this.store.select(fromProject.getAvailablePlans);
    // this.fetchPlans();  
  }

  onAddAccount(form: NgForm) {
    this.accountService.addAccount( form.value );
  }

  // onSubmit(form: NgForm) {
  //   console.log(form);
  // }

}
