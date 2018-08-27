import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Store } from '@ngrx/store';

import { Test } from '../test.model';
import { VentureService } from '../venture.service';
import * as fromVenture from '../venture.reducer';

@Component({
  selector: 'app-past-venture',
  templateUrl: './past-venture.component.html',
  styleUrls: ['./past-venture.component.css']
})
export class PastVentureComponent implements OnInit, AfterViewInit {
  // the displayedColumns array keeps the order of the columns on the screen mat-table
  displayedColumns = ['date', 'name', 'duration', 'calories', 'state'];
  dataSource = new MatTableDataSource<Test>();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private ventureService: VentureService, 
    private store: Store<fromVenture.State>
  ) {}

  ngOnInit() {
    this.store.select(fromVenture.getFinishedTests).subscribe(
      (tests: Test[]) => {
        this.dataSource.data = tests;
      }
    );
    this.ventureService.fetchCompletedOrCancelledTests();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  doFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
