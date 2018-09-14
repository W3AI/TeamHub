import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { Relation } from "./relation.model";
import { Invite } from "./invite.model";
import { UIService } from '../shared/ui.service';
import * as UI from '../shared/ui.actions';
import * as Friend from './friend.actions';
import * as fromFriend from './friend.reducer';

@Injectable()
export class FriendService {
    private fbSubs: Subscription[] = [];    // Firebase subscriptions

    constructor(
        private db: AngularFirestore, 
        private uiService: UIService, 
        private store: Store<fromFriend.State>
    ) {}

    // fetchRelations() {
    //   this.store.dispatch(new UI.StartLoading());
    //   this.fbSubs.push(
    //     this.db
    //     .collection('Friends')
    //     .snapshotChanges()               
    //     .pipe(map(docArray => {
    //     // For testing fetching the tags from Firestore
    //     //   throw(new Error());
    //       return docArray.map(doc => {
    //         return {
    //           id: doc.payload.doc.id,
    //           name: doc.payload.doc.data()["name"],
    //           duration: doc.payload.doc.data()["email"],
    //           calories: doc.payload.doc.data()["invited"]
    //         };
    //       });
    //     }))
    //     .subscribe((relations: Relation[]) => {
    //         this.store.dispatch(new UI.StopLoading());
    //         this.store.dispatch(new Friend.SetAvailableRelations(relations));
    //     }, error => {
    //         this.store.dispatch(new UI.StopLoading());
    //         this.uiService.showSnackbar(
    //             'Fetching Tags failed, please try again later', null, 3000);
    //     }));  
    // }

    addFriend(friend: Relation) {
        this.addFriendToDatabase(friend);
    }

    // startActivity(selectedId: string) {
    //     this.store.dispatch(new Skill.StartSkill(selectedId));
    // }

    // completeActivity() {
    //     this.store.select(fromSkill.getActiveSkill).pipe(take(1)).subscribe(ex => {
    //         this.addDataToDatabase({ 
    //             ...ex, 
    //             date: new Date(), 
    //             state: 'completed' });
    //             this.store.dispatch(new Skill.StopSkill());    
    //     });
    // }

    // fetchAvailableTalents() {
    //     this.fbSubs.push(this.db
    //     .collection('Skills')
    //     .valueChanges()
    //     .subscribe((talents: Talent[]) => {
    //         this.store.dispatch(new Skill.SetAvailableTalents(talents));
    //     }));
    // }

    cancelSubscriptions() {
        this.fbSubs.forEach(sub => sub.unsubscribe());
    }

    // private addDataToDatabase(activity: Activity) {
    //     this.db.collection('finishedActivities').add(activity);
    // }

    private addFriendToDatabase(friend: Relation) {
        this.db.collection('Friends').add(friend);
    }

}