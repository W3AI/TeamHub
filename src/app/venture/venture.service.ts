import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { Investment } from "./investment.model";
import { Control } from "./control.model";
import { Plan } from "../project/plan.model";
import { Talent } from "../skill/talent.model";
import { Adventure } from "../logic/Adventure";
import { UIService } from '../shared/ui.service';
import * as UI from '../shared/ui.actions';
import * as Venture from './venture.actions';
import * as fromVenture from './venture.reducer';

@Injectable()
export class VentureService {
    private fbSubs: Subscription[] = [];    // Firebase subscriptions
    projectDoc: AngularFirestoreDocument;

    // Projects and Services read/returned from db on selections from 
    // the dual flipper / browser
    dbProjects: Array<Plan> = [];
    dbServices: Array<Talent> = [];

    adventures: Adventure[] = [];
    newAdventure: Adventure;

    constructor(
        private db: AngularFirestore, 
        private uiService: UIService, 
        private store: Store<fromVenture.State>
    ) {}

    startAdventure() {
        this.newAdventure = new Adventure();
    }

    getProject( index: number ): Plan {
        return this.dbProjects[index];
    }

    // fetch all projects from Projects collection
    fetchAvailableProjects() {
        this.fbSubs.push(
            this.db
            .collection('Projects')
            .snapshotChanges()               
            .pipe(map(docArray => {
              return docArray.map(doc => {
                return {
                  id: doc.payload.doc.id,
                  name: doc.payload.doc.data()["name"],
                  tags: doc.payload.doc.data()["tags"],
                  startScript: doc.payload.doc.data()["startScript"],
                  checkScript: doc.payload.doc.data()["checkScript"],
                  privacy: doc.payload.doc.data()["privacy"],
                };
              });
            }))
            .subscribe((plans: Plan[]) => {
                this.store.dispatch(new UI.StopLoading());
                this.store.dispatch(new Venture.SetAvailableProjects(plans));
                // plans contain all projects in FS Projects collection
                this.dbProjects.push(...plans);
                console.log(this.dbProjects[0]);
            }, error => {
                this.store.dispatch(new UI.StopLoading());
                this.uiService.showSnackbar(
                    'Fetching Projects failed, please try again later', null, 3000);
            })); 
    }

    // fetch all services/skills from Skills collection in FS
    fetchAvailableServices() {
        this.fbSubs.push(
            this.db
            .collection('Skills')
            .snapshotChanges()               
            .pipe(map(docArray => {
              return docArray.map(doc => {
                return {
                  id: doc.payload.doc.id,
                  name: doc.payload.doc.data()["name"],
                  tags: doc.payload.doc.data()["tags"],
                  inputScript: doc.payload.doc.data()["inputScript"],
                  transScript: doc.payload.doc.data()["transScript"],
                  outputScript: doc.payload.doc.data()["outputScript"],
                  privacy: doc.payload.doc.data()["privacy"],
                };
              });
            }))
            .subscribe((talents: Talent[]) => {
                this.store.dispatch(new UI.StopLoading());
                this.store.dispatch(new Venture.SetAvailableServices(talents));
                // services contain all services in FS Skills collection
                this.dbServices.push(...talents);
                console.log(this.dbServices[0]);
            }, error => {
                this.store.dispatch(new UI.StopLoading());
                this.uiService.showSnackbar(
                    'Fetching Services failed, please try again later', null, 3000);
            })); 
    }

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

    fetchAvailableInvestments() {
        this.fbSubs.push(this.db
        .collection('Ventures')
        .valueChanges()
        .subscribe((investments: Investment[]) => {
            this.store.dispatch(new Venture.SetAvailableInvestments(investments));
        }));
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