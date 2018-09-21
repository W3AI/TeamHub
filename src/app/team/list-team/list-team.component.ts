import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Store } from '@ngrx/store';

import { Group } from '../group.model';
import { TeamService } from '../team.service';
import * as fromTeam from '../team.reducer';

@Component({
  selector: 'app-list-team',
  templateUrl: './list-team.component.html',
  styleUrls: ['./list-team.component.css']
})
export class ListTeamComponent implements OnInit, AfterViewInit {

  displayedColumns = ['name', 'tags', 'description', 'url'];
  dataSource = new MatTableDataSource<Group>();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private teamService: TeamService, 
    private store: Store<fromTeam.State>
  ) {}

  ngOnInit() {
    this.store.select(fromTeam.getAvailableGroups).subscribe(
      (groups: Group[]) => {
        this.dataSource.data = groups;
      }
    );
    this.teamService.fetchAvailableTeams();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  doFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


}
