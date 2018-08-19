import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

import { Task } from '../task.model';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-past-project',
  templateUrl: './past-project.component.html',
  styleUrls: ['./past-project.component.css']
})
export class PastProjectComponent implements OnInit {
  // the displayedColumns array keeps the order of the columns on the screen mat-table
  displayedColumns = ['date', 'name', 'duration', 'calories', 'state'];
  dataSource = new MatTableDataSource<Task>();

  constructor(private projectService: ProjectService) {}

  ngOnInit() {
    this.dataSource.data = this.projectService.getCompletedOrCancelledTasks();
  }
}
