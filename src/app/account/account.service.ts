import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { Bank } from "./bank.model";
import { Card } from "./card.model";
import { Currency } from './currency.model';
import { Group } from './group.model';
import { Organization } from './organization.model';
import { Transaction } from './transaction.model';

import { UIService } from '../shared/ui.service';
import * as UI from '../shared/ui.actions';
import * as Account from './account.actions';
import * as fromAccount from './account.reducer';

@Injectable()
export class AccountService {
    private fbSubs: Subscription[] = [];    // Firebase subscriptions

    constructor(
        private db: AngularFirestore, 
        private uiService: UIService, 
        private store: Store<fromAccount.State>
    ) {}

    fetchAvailableCards() {
      this.store.dispatch(new UI.StartLoading());
      this.fbSubs.push(
        this.db
        .collection('availableCards')
        .snapshotChanges()               
        .pipe(map(docArray => {
        // For testing fetching the cards from Firestore
        //   throw(new Error());
          return docArray.map(doc => {
            return {
              id: doc.payload.doc.id,
              name: doc.payload.doc.data()["name"],
              bank: doc.payload.doc.data()["bank"],
              balance: doc.payload.doc.data()["balance"]
            };
          });
        }))
        .subscribe((cards: Card[]) => {
            this.store.dispatch(new UI.StopLoading());
            this.store.dispatch(new Account.SetAvailableCards(cards));
        }, error => {
            this.store.dispatch(new UI.StopLoading());
            this.uiService.showSnackbar(
                'Fetching data failed, please try again later', null, 3000);
        }));  
    }


    addAccount(account: Bank) {
        this.addAccountToDatabase(account);
    }


    activateAccount(selectedId: string) {
        this.store.dispatch(new Account.ActivateAccount(selectedId));
    }

    // TODO - This should be refactored into completePayment !!!
    // completeTask() {
    //     this.store.select(fromProject.getActiveProject).pipe(take(1)).subscribe(ex => {
    //         this.addDataToDatabase({ 
    //             ...ex, 
    //             date: new Date(), 
    //             state: 'completed' });
    //             this.store.dispatch(new Project.StopProject());    
    //     });
    // }

    // cancelAccount(progress: number) {
    //     this.store.select(fromAccount.getActiveAccount).pipe(take(1)).subscribe(ex => {
    //         this.addDataToDatabase({ 
    //             ...ex, 
    //             state: 'cancelled' 
    //         });
    //         this.store.dispatch(new Account.CancelAccount());    
    //     });
    // }

    // fetchAllAccounts() {
    //     this.fbSubs.push(this.db
    //     .collection('allAccounts')
    //     .valueChanges()
    //     .subscribe((accounts: Account[]) => {
    //         this.store.dispatch(new Account.SetAccount(tasks));
    //     }));
    // }

    cancelSubscriptions() {
        this.fbSubs.forEach(sub => sub.unsubscribe());
    }

    private addTxToDatabase(transaction: Transaction) {
        this.db.collection('Transactions').add(transaction);
    }

    private addAccountToDatabase(account: Account) {
        this.db.collection('Accounts').add(account);
    }

}