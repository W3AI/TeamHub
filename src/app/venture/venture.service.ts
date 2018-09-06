import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { Investment } from "./investment.model";
import { Control } from "./control.model";
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

    fetchAvailableControls() {
      this.store.dispatch(new UI.StartLoading());
      this.fbSubs.push(
        this.db
        .collection('availableControls')
        .snapshotChanges()               
        .pipe(map(docArray => {
        // For controling fetching the tags from Firestore
        //   throw(new Error());
          return docArray.map(doc => {
            return {
              id: doc.payload.doc.id,
              name: doc.payload.doc.data()["name"],
              duration: doc.payload.doc.data()["duration"],
              cost: doc.payload.doc.data()["cost"]
            };
          });
        }))
        .subscribe((controls: Control[]) => {
            this.store.dispatch(new UI.StopLoading());
            this.store.dispatch(new Venture.SetAvailableVentures(controls));
        }, error => {
            this.store.dispatch(new UI.StopLoading());
            this.uiService.showSnackbar(
                'Fetching Tags failed, please try again later', null, 3000);
        }));  
    }

    addVenture(venture: Investment) {
        this.addVentureToDatabase(venture);
    }

    startControl(selectedId: string) {
        this.store.dispatch(new Venture.StartVenture(selectedId));
    }

    completeControl() {
        this.store.select(fromVenture.getActiveVenture).pipe(take(1)).subscribe(ex => {
            this.addDataToDatabase({ 
                ...ex, 
                date: new Date(), 
                state: 'completed' });
                this.store.dispatch(new Venture.StopVenture());    
        });
    }

    cancelControl(progress: number) {
        this.store.select(fromVenture.getActiveVenture).pipe(take(1)).subscribe(ex => {
            this.addDataToDatabase({ 
                ...ex, 
                duration: ex.duration * (progress / 100),
                cost: ex.cost * (progress / 100),
                date: new Date(), 
                state: 'cancelled' 
            });
            this.store.dispatch(new Venture.StopVenture());    
        });
    }

    fetchCompletedOrCancelledControls() {
        this.fbSubs.push(this.db
        .collection('finishedControls')
        .valueChanges()
        .subscribe((controls: Control[]) => {
            this.store.dispatch(new Venture.SetFinishedVentures(controls));
        }));
    }

    cancelSubscriptions() {
        this.fbSubs.forEach(sub => sub.unsubscribe());
    }

    private addDataToDatabase(control: Control) {
        this.db.collection('finishedControls').add(control);
    }

    private addVentureToDatabase(venture: Investment) {
        this.db.collection('Ventures').add(venture);
    }

}