import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ProjectService } from '../project.service';
import { Task } from '../task.model';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.css']
})
export class NewProjectComponent implements OnInit {

   tasks: Task[] = [];

  constructor(private projectService: ProjectService) { }

  ngOnInit() {
    this.tasks = this.projectService.getAvailableTasks();
  }

  onStartProject(form: NgForm) {
    this.projectService.startTask( form.value.task );
  }
}
