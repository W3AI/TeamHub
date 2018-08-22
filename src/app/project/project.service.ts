import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { Task } from "./task.model";
import { UIService } from '../shared/ui.service';
import * as UI from '../shared/ui.actions';
import * as fromRoot from '../app.reducer';

@Injectable()
export class ProjectService {
    taskChanged = new Subject<Task>();
    tasksChanged = new Subject<Task[]>();
    finishedTasksChanged = new Subject<Task[]>();
    private availableTasks: Task[] = [];
    private runningTask: Task;
    private fbSubs: Subscription[] = [];    // Firebase subscriptions

    constructor(
        private db: AngularFirestore, 
        private uiService: UIService, 
        private store: Store<fromRoot.State>
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
            this.availableTasks = tasks;
            this.tasksChanged.next([...this.availableTasks]);
        }, error => {
            this.store.dispatch(new UI.StopLoading());
            this.uiService.showSnackbar(
                'Fetching Tags failed, please try again later', null, 3000);
            this.tasksChanged.next(null);
        }));  
    }

    startTask(selectedId: string) {
        // this.db.doc('availableTasks/' + selectedId).update({
        //     lastSelected: new Date()
        // });
        this.runningTask = this.availableTasks.find(
            task => task.id === selectedId);
        this.taskChanged.next({ ...this.runningTask });
    }

    completeTask() {
        this.addDataToDatabase({ 
            ...this.runningTask, 
            date: new Date(), 
            state: 'completed' });
        this.runningTask = null;
        this.taskChanged.next(null);
    }

    cancelTask(progress: number) {
        this.addDataToDatabase({ 
            ...this.runningTask, 
            duration: this.runningTask.duration * (progress / 100),
            calories: this.runningTask.calories * (progress / 100),
            date: new Date(), 
            state: 'cancelled' });
        this.runningTask = null;
        this.taskChanged.next(null);
    }

    getRunningTask() {
        return { ...this.runningTask };
    }

    fetchCompletedOrCancelledTasks() {
        this.fbSubs.push(this.db
        .collection('finishedTasks')
        .valueChanges()
        .subscribe((tasks: Task[]) => {
            this.finishedTasksChanged.next(tasks);
        }));
    }

    cancelSubscriptions() {
        this.fbSubs.forEach(sub => sub.unsubscribe());
    }

    private addDataToDatabase(task: Task) {
        this.db.collection('finishedTasks').add(task);
    }
}