import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { Test } from "./test.model";
import { UIService } from '../shared/ui.service';
import * as UI from '../shared/ui.actions';
import * as Venture from './venture.actions';
import * as fromVenture from './venture.reducer';

@Injectable()
export class VentureService {
    private fbSubs: Subscription[] = [];    // Firebase subscriptions

    constructor(
        private db: AngularFirestore, 
        private uiService: UIService, 
        private store: Store<fromVenture.State>
    ) {}

    fetchAvailableTests() {
      this.store.dispatch(new UI.StartLoading());
      this.fbSubs.push(
        this.db
        .collection('availableTests')
        .snapshotChanges()               
        .pipe(map(docArray => {
        // For testing fetching the tags from Firestore
        //   throw(new Error());
          return docArray.map(doc => {
            return {
              id: doc.payload.doc.id,
              name: doc.payload.doc.data()["name"],
              duration: doc.payload.doc.data()["duration"],
              calories: doc.payload.doc.data()["calories"]
            };
          });
        }))
        .subscribe((tests: Test[]) => {
            this.store.dispatch(new UI.StopLoading());
            this.store.dispatch(new Venture.SetAvailableVentures(tests));
        }, error => {
            this.store.dispatch(new UI.StopLoading());
            this.uiService.showSnackbar(
                'Fetching Tags failed, please try again later', null, 3000);
        }));  
    }

    startTest(selectedId: string) {
        this.store.dispatch(new Venture.StartVenture(selectedId));
    }

    completeTest() {
        this.store.select(fromVenture.getActiveVenture).pipe(take(1)).subscribe(ex => {
            this.addDataToDatabase({ 
                ...ex, 
                date: new Date(), 
                state: 'completed' });
                this.store.dispatch(new Venture.StopVenture());    
        });
    }

    cancelTest(progress: number) {
        this.store.select(fromVenture.getActiveVenture).pipe(take(1)).subscribe(ex => {
            this.addDataToDatabase({ 
                ...ex, 
                duration: ex.duration * (progress / 100),
                calories: ex.calories * (progress / 100),
                date: new Date(), 
                state: 'cancelled' 
            });
            this.store.dispatch(new Venture.StopVenture());    
        });
    }

    fetchCompletedOrCancelledTests() {
        this.fbSubs.push(this.db
        .collection('finishedTests')
        .valueChanges()
        .subscribe((tests: Test[]) => {
            this.store.dispatch(new Venture.SetFinishedVentures(tests));
        }));
    }

    cancelSubscriptions() {
        this.fbSubs.forEach(sub => sub.unsubscribe());
    }

    private addDataToDatabase(test: Test) {
        this.db.collection('finishedTests').add(test);
    }
}