import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';

import { ProjectService } from '../project.service';
import { Task } from '../task.model';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.css']
})
export class NewProjectComponent implements OnInit, OnDestroy {
  tasks: Task[];
  taskSubscription: Subscription;

  constructor(private projectService: ProjectService) { }

  ngOnInit() {
    this.taskSubscription = this.projectService.tasksChanged.subscribe(
      tasks => (this.tasks = tasks)
    ); 
    this.projectService.fetchAvailableTasks();    
  }

  onStartProject(form: NgForm) {
    this.projectService.startTask( form.value.task );
  }

  ngOnDestroy() {
    this.taskSubscription.unsubscribe();
  }
}
