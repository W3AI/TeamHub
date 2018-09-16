import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Store } from '@ngrx/store';

import { Activity } from '../activity.model';
import { SkillService } from '../skill.service';
import * as fromSkill from '../skill.reducer';

@Component({
  selector: 'app-past-skill',
  templateUrl: './past-skill.component.html',
  styleUrls: ['./past-skill.component.css']
})
export class PastSkillComponent implements OnInit, AfterViewInit {
  // the displayedColumns array keeps the order of the columns on the screen mat-table
  displayedColumns = ['date', 'name', 'duration', 'calories', 'state'];
  dataSource = new MatTableDataSource<Activity>();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private skillService: SkillService, 
    private store: Store<fromSkill.State>
  ) {}

  ngOnInit() {
    this.store.select(fromSkill.getFinishedActivitys).subscribe(
      (activitys: Activity[]) => {
        this.dataSource.data = activitys;
      }
    );
    this.skillService.fetchCompletedOrCancelledActivitys();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  doFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
