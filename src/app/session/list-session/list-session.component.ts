import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Store } from '@ngrx/store';

import { Relation } from '../relation.model';
import { SessionService } from '../session.service';
import * as fromSession from '../session.reducer';

@Component({
  selector: 'app-list-session',
  templateUrl: './list-session.component.html',
  styleUrls: ['./list-session.component.css']
})
export class ListSessionComponent implements OnInit, AfterViewInit {
  displayedColumns = ['name', 'tags', 'description', 'url'];
  dataSource = new MatTableDataSource<Relation>();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private sessionService: SessionService, 
    private store: Store<fromSession.State>
  ) {}

  ngOnInit() {
    this.store.select(fromSession.getAvailableSessions).subscribe(
      (relations: Relation[]) => {
        this.dataSource.data = relations;
      }
    );
    this.sessionService.fetchAvailableRelations();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  doFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
