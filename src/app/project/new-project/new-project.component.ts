import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import { ProjectService } from '../project.service';
import { Task } from '../task.model';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.css']
})
export class NewProjectComponent implements OnInit {

   @Output() projectStart = new EventEmitter<void>();
   // 
   tasks: Task[] = [];

  constructor(private projectService: ProjectService) { }

  ngOnInit() {
    this.tasks = this.projectService.getAvailableTasks();
  }

  onStartTraining() {
    this.projectStart.emit();
  }
}
