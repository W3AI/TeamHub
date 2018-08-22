import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { ProjectService } from '../project.service';
import { Task } from '../task.model';
import { UIService } from '../../shared/ui.service';
import * as fromRoot from '../../app.reducer';


@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.css']
})
export class NewProjectComponent implements OnInit, OnDestroy {
  tasks: Task[];
  isLoading$: Observable<boolean>;
  private taskSubscription: Subscription;

  constructor(
    private projectService: ProjectService, 
    private uiService:  UIService, 
    private store: Store<fromRoot.State>
  ) {}

  ngOnInit() {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    this.taskSubscription = this.projectService.tasksChanged.subscribe(
      tasks => {
        this.tasks = tasks 
      }
    ); 
    this.fetchTasks();   
  }

  // TODO ? - Change Task / Tasks to Tags - ? what about Calories, Duration for tags? generic cost? timeframe?
  fetchTasks() {
    this.projectService.fetchAvailableTasks(); 
  }

  onStartProject(form: NgForm) {
    this.projectService.startTask( form.value.task );
  }

  ngOnDestroy() {
    if (this.taskSubscription) {
      this.taskSubscription.unsubscribe();
    }
  }
}
