import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Subscription } from 'rxjs';

import { Task } from '../task.model';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-past-project',
  templateUrl: './past-project.component.html',
  styleUrls: ['./past-project.component.css']
})
export class PastProjectComponent implements OnInit, AfterViewInit, OnDestroy {
  // the displayedColumns array keeps the order of the columns on the screen mat-table
  displayedColumns = ['date', 'name', 'duration', 'calories', 'state'];
  dataSource = new MatTableDataSource<Task>();
  private exChangedSubscription: Subscription;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private projectService: ProjectService) {}

  ngOnInit() {
    this.exChangedSubscription = this.projectService.finishedTasksChanged.subscribe(
      (tasks: Task[]) => {
        this.dataSource.data = tasks;
      }
    );
    this.projectService.fetchCompletedOrCancelledTasks();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  doFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnDestroy() {
    if (this.exChangedSubscription) {
      this.exChangedSubscription.unsubscribe();
    }
  }
}
