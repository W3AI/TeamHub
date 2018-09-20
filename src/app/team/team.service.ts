import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { Group } from "./group.model";
import { Player } from "./player.model";
import { UIService } from '../shared/ui.service';
import * as UI from '../shared/ui.actions';
import * as Team from './team.actions';
import * as fromTeam from './team.reducer';

@Injectable()
export class TeamService {
    private fbSubs: Subscription[] = [];    // Firebase subscriptions

    constructor(
        private db: AngularFirestore, 
        private uiService: UIService, 
        private store: Store<fromTeam.State>
    ) {}

    fetchAvailableActivitys() {
      this.store.dispatch(new UI.StartLoading());
      this.fbSubs.push(
        this.db
        .collection('availablePlayers')
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
        .subscribe((players: Player[]) => {
            this.store.dispatch(new UI.StopLoading());
            this.store.dispatch(new Team.SetAvailablePlayers(players));
        }, error => {
            this.store.dispatch(new UI.StopLoading());
            this.uiService.showSnackbar(
                'Fetching Tags failed, please try again later', null, 3000);
        }));  
    }

    addTeam(team: Group) {
        this.addTeamToDatabase(team);
    }

    invitePlayer(selectedId: string) {
        this.store.dispatch(new Team.InvitePlayer(selectedId));   // it was StartActivity
    }

    invitedPlayer() {  // it was completeActivity
        this.store.select(fromTeam.getActivePlayer).pipe(take(1)).subscribe(ex => {
            this.addPlayerToDatabase({ 
                ...ex, 
                date: new Date(), 
                state: 'invited' });
                this.store.dispatch(new Team.StopInviting());    
        });
    }

    // This might not be needed here - but for manual decision for sending exec commands 
    // Although cancelInvite would be valid when other resource is commited
    cancelInvite(progress: number) {  // it was cancelActivity - 
        this.store.select(fromTeam.getActivePlayer).pipe(take(1)).subscribe(ex => {
            this.addPlayerToDatabase({ 
                ...ex, 
                duration: ex.duration * (progress / 100),
                calories: ex.calories * (progress / 100),
                date: new Date(), 
                state: 'canceled' 
            });
            this.store.dispatch(new Team.StopInviting());    
        });
    }

    fetchAvailableTeams() {
        this.fbSubs.push(this.db
        .collection('Teams')
        .valueChanges()
        .subscribe((teams: Group[]) => {
            this.store.dispatch(new Team.SetAvailableTeams(teams));
        }));
    }

    fetchInvitedPlayers() {
        this.fbSubs.push(this.db
        .collection('invitedPlayers')
        .valueChanges()
        .subscribe((players: Player[]) => {
            this.store.dispatch(new Team.SetInvitedPlayers(players));
        }));
    }

    cancelSubscriptions() {
        this.fbSubs.forEach(sub => sub.unsubscribe());
    }

    private addPlayerToDatabase(player: Player) {
        this.db.collection('invitedPlayers').add(player);   // it was 'finishedActivities'
    }

    private addTeamToDatabase(team: Group) {
        this.db.collection('Teams').add(team);
    }

}