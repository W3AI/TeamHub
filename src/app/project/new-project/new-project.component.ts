import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { ProjectService } from '../project.service';
import { Task } from '../task.model';
import { UIService } from '../../shared/ui.service';
import * as fromProject from '../project.reducer';
import * as fromRoot from '../../app.reducer';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.css']
})
export class NewProjectComponent implements OnInit {
  tasks$: Observable<Task[]>;
  isLoading$: Observable<boolean>;

  constructor(
    private projectService: ProjectService, 
    private uiService:  UIService, 
    private store: Store<fromProject.State>
  ) {}

  ngOnInit() {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    this.tasks$ = this.store.select(fromProject.getAvailableTasks);
    this.fetchTasks();   
  }

  // TODO ? - Change Task / Tasks to Tags - ? what about Calories, Duration for tags? generic cost? timeframe?
  fetchTasks() {
    this.projectService.fetchAvailableTasks(); 
  }

  onStartProject(form: NgForm) {
    this.projectService.startTask( form.value.task );
  }
}
