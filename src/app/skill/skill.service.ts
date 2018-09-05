import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { Talent } from "./talent.model";
import { Activity } from "./activity.model";
import { UIService } from '../shared/ui.service';
import * as UI from '../shared/ui.actions';
import * as Skill from './skill.actions';
import * as fromSkill from './skill.reducer';

@Injectable()
export class SkillService {
    private fbSubs: Subscription[] = [];    // Firebase subscriptions

    constructor(
        private db: AngularFirestore, 
        private uiService: UIService, 
        private store: Store<fromSkill.State>
    ) {}

    fetchAvailableActivitys() {
      this.store.dispatch(new UI.StartLoading());
      this.fbSubs.push(
        this.db
        .collection('availableActivities')
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
        .subscribe((activitys: Activity[]) => {
            this.store.dispatch(new UI.StopLoading());
            this.store.dispatch(new Skill.SetAvailableSkills(activitys));
        }, error => {
            this.store.dispatch(new UI.StopLoading());
            this.uiService.showSnackbar(
                'Fetching Tags failed, please try again later', null, 3000);
        }));  
    }

    addSkill(skill: Talent) {
        this.addSkillToDatabase(skill);
    }

    startActivity(selectedId: string) {
        this.store.dispatch(new Skill.StartSkill(selectedId));
    }

    completeActivity() {
        this.store.select(fromSkill.getActiveSkill).pipe(take(1)).subscribe(ex => {
            this.addDataToDatabase({ 
                ...ex, 
                date: new Date(), 
                state: 'completed' });
                this.store.dispatch(new Skill.StopSkill());    
        });
    }

    cancelActivity(progress: number) {
        this.store.select(fromSkill.getActiveSkill).pipe(take(1)).subscribe(ex => {
            this.addDataToDatabase({ 
                ...ex, 
                duration: ex.duration * (progress / 100),
                calories: ex.calories * (progress / 100),
                date: new Date(), 
                state: 'cancelled' 
            });
            this.store.dispatch(new Skill.StopSkill());    
        });
    }

    fetchCompletedOrCancelledActivitys() {
        this.fbSubs.push(this.db
        .collection('finishedActivities')
        .valueChanges()
        .subscribe((activitys: Activity[]) => {
            this.store.dispatch(new Skill.SetFinishedSkills(activitys));
        }));
    }

    cancelSubscriptions() {
        this.fbSubs.forEach(sub => sub.unsubscribe());
    }

    private addDataToDatabase(activity: Activity) {
        this.db.collection('finishedActivities').add(activity);
    }

    private addSkillToDatabase(skill: Talent) {
        this.db.collection('Skills').add(skill);
    }

}