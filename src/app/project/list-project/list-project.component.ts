import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Store } from '@ngrx/store';

import { Plan } from '../plan.model';
import { ProjectService } from '../project.service';
import * as fromProject from '../project.reducer';

@Component({
  selector: 'app-list-project',
  templateUrl: './list-project.component.html',
  styleUrls: ['./list-project.component.css']
})
export class ListProjectComponent implements OnInit, AfterViewInit {
  displayedColumns = ['name', 'tags', 'description', 'url'];
  dataSource = new MatTableDataSource<Plan>();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private projectService: ProjectService, 
    private store: Store<fromProject.State>
  ) {}

  ngOnInit() {
    this.store.select(fromProject.getAvailablePlans).subscribe(
      (plans: Plan[]) => {
        this.dataSource.data = plans;
      }
    );
    this.projectService.fetchAvailablePlans();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  doFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
