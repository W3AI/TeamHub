import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { Plan } from "./plan.model";
import { Task } from "./task.model";
import { UIService } from '../shared/ui.service';
import * as UI from '../shared/ui.actions';
import * as Project from './project.actions';
import * as fromProject from './project.reducer';

@Injectable()
export class ProjectService {
    private fbSubs: Subscription[] = [];    // Firebase subscriptions

    constructor(
        private db: AngularFirestore, 
        private uiService: UIService, 
        private store: Store<fromProject.State>
    ) {}

    fetchAvailableTasks() {
      this.store.dispatch(new UI.StartLoading());
      this.fbSubs.push(
        this.db
        .collection('availableTasks')
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
        .subscribe((tasks: Task[]) => {
            this.store.dispatch(new UI.StopLoading());
            this.store.dispatch(new Project.SetAvailableProjects(tasks));
        }, error => {
            this.store.dispatch(new UI.StopLoading());
            this.uiService.showSnackbar(
                'Fetching Tags failed, please try again later', null, 3000);
        }));  
    }

    addProject(project: Plan) {
        this.addProjectToDatabase(project);
    }

    startTask(selectedId: string) {
        this.store.dispatch(new Project.StartProject(selectedId));
    }

    completeTask() {
        this.store.select(fromProject.getActiveProject).pipe(take(1)).subscribe(ex => {
            this.addDataToDatabase({ 
                ...ex, 
                date: new Date(), 
                state: 'completed' });
                this.store.dispatch(new Project.StopProject());    
        });
    }

    cancelTask(progress: number) {
        this.store.select(fromProject.getActiveProject).pipe(take(1)).subscribe(ex => {
            this.addDataToDatabase({ 
                ...ex, 
                duration: ex.duration * (progress / 100),
                calories: ex.calories * (progress / 100),
                date: new Date(), 
                state: 'cancelled' 
            });
            this.store.dispatch(new Project.StopProject());    
        });
    }

    fetchCompletedOrCancelledTasks() {
        this.fbSubs.push(this.db
        .collection('finishedTasks')
        .valueChanges()
        .subscribe((tasks: Task[]) => {
            this.store.dispatch(new Project.SetFinishedProjects(tasks));
        }));
    }

    cancelSubscriptions() {
        this.fbSubs.forEach(sub => sub.unsubscribe());
    }

    private addDataToDatabase(task: Task) {
        this.db.collection('finishedTasks').add(task);
    }

    private addProjectToDatabase(project: Plan) {
        this.db.collection('Projects').add(project);
    }

}