import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';

import { ProjectService } from '../project.service';
import { Task } from '../task.model';
import { UIService } from '../../shared/ui.service';


@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.css']
})
export class NewProjectComponent implements OnInit, OnDestroy {
  tasks: Task[];
  private taskSubscription: Subscription;
  isLoading = true;
  private loadingSubscription: Subscription;

  constructor(private projectService: ProjectService, private uiService:  UIService) { }

  ngOnInit() {
    this.loadingSubscription = this.uiService.loadingStateChanged.subscribe(
      isLoading => {
        this.isLoading = isLoading;
      }
    );
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
    this.taskSubscription.unsubscribe();
    this.loadingSubscription.unsubscribe();
  }
}
